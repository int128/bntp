import { Record } from 'immutable';

export default class AppPreference extends Record({
  indentFolders: false,
  showTopSites: true,
  showBookmarks: true,
}) {
  merge(map) {
    return new AppPreference(super.merge(map).toJS());
  }
}
