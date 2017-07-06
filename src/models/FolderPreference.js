import { Record } from 'immutable';

export default class FolderPreference extends Record({
  id: null,
  collapsed: false,
}) {
  merge(map) {
    return new FolderPreference(super.merge(map));
  }

  collapse() {
    return this.merge({collapsed: true});
  }

  toggle() {
    return this.merge({collapsed: !this.collapsed});
  }
}
