import KVStorage from "./KVStorage";

const KEY_LANGUAGES = "LANGUAGES";
const KEY_LAST_LANGUAGES = "LAST_LANGUAGES";

const getAutoLanguage = () => ({ id: "auto", code: "auto", state: "Detect" });
const getDefaultLanguages = () => [
  { id: "en", code: "en", state: "English" },
  { id: "ru", code: "ru", state: "Russian" },
  { id: "ja", code: "ja", state: "Japanese" },
];
const validateLanguageList = (list) => +(list?.length || 0) < 2;

class ServiceLangSettings {
  constructor() {
    this.subscriber = () => this.checkStorage();
    KVStorage.subscribe(this.subscriber);

    this.getAutoLanguage = getAutoLanguage;
    this.getLanguageList = () => KVStorage.get(KEY_LANGUAGES);
    this.saveLanguageList = (list) => KVStorage.set(KEY_LANGUAGES, list);
  }

  checkStorage() {
    const list = this.getLanguageList();
    console.log("ServiceLangSettings checkStorage", validateLanguageList(list));
    if (validateLanguageList(list)) {
      this.saveLanguageList(getDefaultLanguages());
    }
  }

  saveLanguage(lang) {
    const list = this.getLanguageList();
    if (list.some((l) => l.id === lang.id)) return;
    const newList = [...(list || []), lang];
    this.saveLanguageList(newList);
  }
  deleteLanguage(lang) {
    const list = this.getLanguageList();
    const newList = (list || []).filter((item) => item.id !== lang.id);
    if (validateLanguageList(list)) return;
    this.saveLanguageList(newList);
  }

  getLastLanguages() {
    return KVStorage.get(KEY_LAST_LANGUAGES);
  }
  saveLastLanguages(languages) {
    KVStorage.set(KEY_LAST_LANGUAGES, languages);
  }
}

export default new ServiceLangSettings();
