import Themes from './Themes.js';

class KeyValueMap {
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
        if (e.newValue === null) {
          callback.call(this, this._defaultValue);
        } else {
          callback.call(this, e.newValue);
        }
      }
    };
    window.addEventListener('storage', listener);
    this._listeners.push(listener);
  }
}

class Single extends KeyValueMap {
  find() {
    return super.find(0);
  }
  save(value) {
    super.save(0, value);
  }
  onChange(callback) {
    super.onChange(0, callback);
  }
}

export const FolderCollapse = new KeyValueMap('FolderCollapse', false);
export const Visibility = new KeyValueMap('Visibility', true);

export const CurrentTheme = new Single('CurrentTheme', Themes.getDefault().name);
