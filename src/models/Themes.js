export class Theme {
  constructor({name, title, style}) {
    this.name = name;
    this.title = title;
    this.style = style;
  }
}

export const Themes = [
  new Theme({name: 'light', title: 'Light'}),
  new Theme({name: 'dark', title: 'Dark'}),
  new Theme({name: 'solarized-light', title: 'Solarized Light'}),
  new Theme({name: 'solarized-dark', title: 'Solarized Dark'}),
];

Themes.findAll = () => Themes;

Themes.findOrDefault = name => Themes.find(theme => theme.name === name) || Themes.getDefault();

Themes.getDefault = () => Themes[0];
