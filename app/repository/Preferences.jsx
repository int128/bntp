export default {
  getThemeName() {
    return localStorage.theme;
  },
  saveThemeName(name) {
    localStorage.theme = name;
  },
  get(name, defaultValue) {
    const value = localStorage.getItem(name);
    return (value === null) ? defaultValue : JSON.parse(value);
  },
  save(state) {
    Object.keys(state).forEach((key) =>
      localStorage.setItem(key, JSON.stringify(state[key]))
    );
  }
}
