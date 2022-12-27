const KEY_WORD_SET_LIST = "WORD_SET_LIST";
const KEY_LAST_LANGUAGES = "LAST_LANGUAGES";

const getDefaultWordSet = () => ({
  id: "DEFAULT",
  name: "Default",
  emoji: "🔤",
  description: "Default word set",
});

class KVStorage {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return key;
  }
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return null;
    }
  }

  checkStorage() {
    const list = this.getWordSetList();
    if (!list || !list.find((item) => item.id === getDefaultWordSet().id)) {
      this.saveWordSet(getDefaultWordSet());
    }
    if (!list) {
      this.saveWordSet({
        id: Date.now(),
        name: "Additional",
        emoji: "📚",
        description: "Additional word set",
      });
    }
  }

  getWordSetList() {
    return this.get(KEY_WORD_SET_LIST);
  }
  saveWordSet(wordSet) {
    const list = this.getWordSetList();
    const newList = [...(list || []), wordSet];
    this.set(KEY_WORD_SET_LIST, newList);
  }
  deleteWordSet(wordSet) {
    if (wordSet.id === getDefaultWordSet().id) return;
    const list = this.getWordSetList();
    const newList = (list || []).filter((item) => item.id !== wordSet.id);
    this.set(KEY_WORD_SET_LIST, newList);
  }

  getLastLanguages() {
    return this.get(KEY_LAST_LANGUAGES);
  }
  saveLastLanguages(languages) {
    this.set(KEY_LAST_LANGUAGES, languages);
  }
}

export default new KVStorage();
