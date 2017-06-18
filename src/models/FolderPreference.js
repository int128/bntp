import { Record } from 'immutable';

export default class FolderPreference extends Record({
  id: null,
  collapsed: false,
}) {
  static DEFAULT = new FolderPreference();

  merge(map) {
    return new FolderPreference(super.merge(map));
  }

  toggle() {
    return this.merge({collapsed: !this.collapsed});
  }
}
