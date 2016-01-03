export default {
  getThemeName() {
    return localStorage.theme;
  },
  setThemeName(name) {
    localStorage.theme = name;
  },
  get(name, defaultValue) {
    const value = localStorage.getItem(name);
    return (value === null) ? defaultValue : JSON.parse(value);
  },
  set(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
  }
}
