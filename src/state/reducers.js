import { Seq } from 'immutable';

import * as bookmarks from './bookmarks/reducers'
import * as chromeApps from './chromeApps/reducers'
import * as notifications from './notifications/reducers'
import * as themeSelection from './themeSelection/reducers'
import * as topsites from './topsites/reducers'
import * as visibilities from './visibilities/reducers'
import * as folderPreferences from './folderPreferences/reducers'
import * as folderItemPreferences from './folderItemPreferences/reducers'
import * as folderItemEditor from './folderItemEditor/reducers'

export function chromePageFolders(state = Seq(), action) {
  return state;
}

export default {
  ...bookmarks,
  ...chromeApps,
  ...notifications,
  ...themeSelection,
  ...topsites,
  ...visibilities,
  ...folderPreferences,
  ...folderItemPreferences,
  ...folderItemEditor,
  chromePageFolders,
};
