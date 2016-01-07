import LightTheme from '../theme/light.less';
import DarkTheme from '../theme/dark.less';
import SolarizedLightTheme from '../theme/solarized-light.less';
import SolarizedDarkTheme from '../theme/solarized-dark.less';

export default {
  findAll() {
    return themes;
  },
  findOrDefault(name) {
    return themes.find(theme => theme.name == name) || this.getDefault();
  },
  getDefault() {
    return themes[0];
  }
}

class Theme {
  constructor(name, title, style) {
    this.name = name;
    this.title = title;
    this._style = style;
  }
  apply() {
    if (currentLoadedStyle) {
      currentLoadedStyle.unuse();
    }
    currentLoadedStyle = this._style;
    currentLoadedStyle.use();
  }
}

// Memory previous style to unload by style-loader
var currentLoadedStyle = null;

const themes = [
  new Theme('light', 'Light', LightTheme),
  new Theme('dark', 'Dark', DarkTheme),
  new Theme('solarized-light', 'Solarized Light', SolarizedLightTheme),
  new Theme('solarized-dark', 'Solarized Dark', SolarizedDarkTheme),
];
