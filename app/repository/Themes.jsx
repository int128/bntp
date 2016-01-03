import LightTheme from '../theme/light.less';
import DarkTheme from '../theme/dark.less';
import SolarizedLightTheme from '../theme/solarized-light.less';
import SolarizedDarkTheme from '../theme/solarized-dark.less';

export default {
  all() {
    return themes;
  },
  findOrDefault(name) {
    return themes.find(item => item.name == name) || themes[0];
  }
}

class Theme {
  constructor(name, title, style) {
    this.name = name;
    this.title = title;
    this._style = style;
  }
  enable() {
    this._style.use();
  }
  disable() {
    this._style.unuse();
  }
}

const themes = [
  new Theme('light', 'Light', LightTheme),
  new Theme('dark', 'Dark', DarkTheme),
  new Theme('solarized-light', 'Solarized Light', SolarizedLightTheme),
  new Theme('solarized-dark', 'Solarized Dark', SolarizedDarkTheme),
];
