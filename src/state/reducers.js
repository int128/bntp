import { Seq } from 'immutable';

import * as bookmarks from './bookmarks/reducers'
import * as bookmarkPreference from './bookmarkPreference/reducers'
import * as chromeApps from './chromeApps/reducers'
import * as folderPreferences from './folderPreferences/reducers'
import * as notifications from './notifications/reducers'
import * as themeSelection from './themeSelection/reducers'
import * as topsites from './topsites/reducers'
import * as visibilities from './visibilities/reducers'

export function chromePageFolders(state = Seq(), action) {
  return state;
}

export default {
  ...bookmarks,
  ...bookmarkPreference,
  ...chromeApps,
  ...folderPreferences,
  ...notifications,
  ...themeSelection,
  ...topsites,
  ...visibilities,
  chromePageFolders,
};
