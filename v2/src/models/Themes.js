import { Seq } from 'immutable';

import Theme from './Theme';

export class Themes {
  static get() {
    return THEMES;
  }

  constructor(themes) {
    this.themes = Seq(themes);
  }

  map(...args) {
    return this.themes.map(...args);
  }

  getById(id) {
    return this.themes.find(theme => theme.id === id, null, this.getDefault());
  }

  getDefault() {
    return this.themes.first();
  }
}

export const THEMES = new Themes([
  new Theme({id: 'light', title: 'Light'}),
  new Theme({id: 'dark', title: 'Dark'}),
  new Theme({id: 'solarized-light', title: 'Solarized Light'}),
  new Theme({id: 'solarized-dark', title: 'Solarized Dark'}),
])
