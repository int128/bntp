module.exports = {
  getThemeNameOrDefault: function (defaultValue) {
    return localStorage.theme ? localStorage.theme : defaultValue;
  },
  setTheme: function (name) {
    localStorage.theme = name;
  }
};
