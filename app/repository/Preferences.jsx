module.exports = {
  getThemeName: function () {
    return localStorage.theme;
  },
  setThemeName: function (name) {
    localStorage.theme = name;
  },
  get: function (name, defaultValue) {
    const value = localStorage.getItem(name);
    return (value === null) ? defaultValue : JSON.parse(value);
  },
  set: function (name, value) {
    localStorage.setItem(name, JSON.stringify(value));
  }
};
