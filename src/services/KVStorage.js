class KVStorage {
  subscribers = [];

  init() {
    this.subscribers.forEach((s) => s());
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

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
}

export default new KVStorage();
