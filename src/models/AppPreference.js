import { Record } from 'immutable';

import { THEMES } from './Themes';

export default class AppPreference extends Record({
  indentFolders: false,
  showTopSites: true,
  showBookmarks: true,
  theme: THEMES.getDefault(),
}) {
  merge(map) {
    return new AppPreference(super.merge(map));
  }
}
