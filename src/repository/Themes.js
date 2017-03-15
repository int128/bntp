class Theme {
  constructor(name, title) {
    this.name = name;
    this.title = title;
  }
}

const themes = [
  new Theme('light', 'Light'),
  new Theme('dark', 'Dark'),
  new Theme('solarized-light', 'Solarized Light'),
  new Theme('solarized-dark', 'Solarized Dark'),
];

export default {
  findAll() {
    return themes;
  },
  findOrDefault(name) {
    return themes.find(theme => theme.name === name) || this.getDefault();
  },
  getDefault() {
    return themes[0];
  }
}
