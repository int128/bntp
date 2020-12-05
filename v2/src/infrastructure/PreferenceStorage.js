export default class PreferenceStorage {
  constructor(key) {
    this.key = key;
  }

  get() {
    try {
      return JSON.parse(localStorage.getItem(this.key));
    } catch (e) {
      console.warn(e);
      return null;
    }
  }

  save(json) {
    localStorage.setItem(this.key, JSON.stringify(json));
  }

  remove() {
    localStorage.removeItem(this.key);
  }

  poll() {
    return new Promise(resolve => {
      const callback = e => {
        if (e.storageArea === localStorage && e.key === this.key && e.newValue !== null) {
          window.removeEventListener('storage', callback);
          resolve();
        }
      }
      window.addEventListener('storage', callback);
    });
  }
}
