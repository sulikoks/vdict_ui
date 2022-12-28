import KVStorage from "./KVStorage";

const KEY_WORD_SET_LIST = "WORD_SET_LIST";
const DEFAULT_WORD_SET_ID = "DEFAULT";

const getDefaultWordSet = () => ({
  id: DEFAULT_WORD_SET_ID,
  name: "Default",
  emoji: "🔤",
  description: "Default word set",
});
const getEmptyWordSet = () => ({
  id: Date.now(),
  emoji: "",
  name: "",
  description: "",
});

class ServiceWordSet {
  constructor() {
    this.subscriber = () => this.checkStorage();
    KVStorage.subscribe(this.subscriber);

    this.getEmptyWordSet = getEmptyWordSet;
  }

  checkStorage() {
    console.log("ServiceWordSet checkStorage");
    const list = this.getWordSetList();
    if (!list || !list.find((item) => item.id === DEFAULT_WORD_SET_ID)) {
      this.saveWordSet(getDefaultWordSet());
    }
    if (!list) {
      const set = getEmptyWordSet();
      set.name = "Additional";
      set.emoji = "📚";
      set.description = "Additional word set";
      this.saveWordSet(set);
    }
  }

  getWordSetList() {
    return KVStorage.get(KEY_WORD_SET_LIST);
  }
  saveWordSet(wordSet) {
    const list = this.getWordSetList();
    const newList = [...(list || []), wordSet];
    KVStorage.set(KEY_WORD_SET_LIST, newList);
  }
  deleteWordSet(wordSet) {
    if (wordSet.id === DEFAULT_WORD_SET_ID) return;
    const list = this.getWordSetList();
    const newList = (list || []).filter((item) => item.id !== wordSet.id);
    KVStorage.set(KEY_WORD_SET_LIST, newList);
  }
}

export default new ServiceWordSet();
