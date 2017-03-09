class Preferences {
  constructor(prefix, defaultValue) {
    this._prefix = prefix;
    this._defaultValue = defaultValue;
    this._listeners = [];
  }
  find(id) {
    const value = localStorage.getItem(`${this._prefix}__${id}`);
    return value === null ? this._defaultValue : value;
  }
  save(id, value) {
    if (value === this._defaultValue) {
      localStorage.removeItem(`${this._prefix}__${id}`);
    } else {
      localStorage.setItem(`${this._prefix}__${id}`, value);
    }
    this._listeners.forEach((listener) =>
      listener.call(this, {
        storageArea: localStorage,
        key: `${this._prefix}__${id}`,
        newValue: value
      }));
  }
  onChange(id, callback) {
    const listener = (e) => {
      if (e.storageArea === localStorage && e.key === `${this._prefix}__${id}`) {
        callback.call(this, e.newValue);
      }
    };
    window.addEventListener('storage', listener);
    this._listeners.push(listener);
  }
}

export const FolderCollapse = new Preferences('FolderCollapse', false);
export const Visibility = new Preferences('Visibility', true);
export const CurrentTheme = new Preferences('CurrentTheme');
