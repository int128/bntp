import { combineReducers } from 'redux';

import {
  bookmarkFolders,
  chromePageFolders,
  chromeAppFolders,
  editingBookmark,
} from './bookmarks';

import {
  topSites,
} from './topsites';

import {
  folderPreference,
  themes,
  selectedTheme,
  visibilities,
} from './preferences';

import {
  online,
  manifest,
} from './notifications';

export default combineReducers({
  bookmarkFolders,
  chromePageFolders,
  chromeAppFolders,
  editingBookmark,
  topSites,
  folderPreference,
  themes,
  selectedTheme,
  visibilities,
  online,
  manifest,
})
