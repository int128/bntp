import { Record } from 'immutable';

import { THEMES } from './Themes';

export default class AppPreference extends Record({
  indentFolders: false,
  showTopSites: true,
  showBookmarks: true,
  showSearchField: true,
  theme: THEMES.getDefault(),
}) {
  static DEFAULT = new AppPreference()
}
