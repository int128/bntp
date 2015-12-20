module.exports = {
  getThemeName: function () {
    return localStorage.theme;
  },
  setThemeName: function (name) {
    localStorage.theme = name;
  }
};
