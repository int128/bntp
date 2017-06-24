import { Seq } from 'immutable';

export default class Themes {
  constructor(themes) {
    this.themes = Seq(themes);
  }

  map(...args) {
    return this.themes.map(...args);
  }

  getById(id) {
    return this.themes.find(theme => theme.id === id, null, this.themes.first());
  }

  getSelected() {
    return this.themes.find(theme => theme.selected);
  }

  select(selected) {
    return new Themes(this.themes.map(theme => theme.set('selected', theme.id === selected.id)));
  }
}
