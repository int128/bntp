import { Seq } from 'immutable';

import * as actionTypes from './actionTypes';

import FolderItemPreferences from '../../models/FolderItemPreferences';

export function bookmarkFolders(state = Seq(), action) {
  switch (action.type) {
    case actionTypes.RECEIVE_BOOKMARKS:
      return action.bookmarkFolders;

    default:
      return state;
  }
}

export function chromeAppFolders(state = Seq(), action) {
  switch (action.type) {
    case actionTypes.RECEIVE_CHROME_APPS:
      return action.chromeAppFolders;
    default:
      return state;
  }
}

export function chromePageFolders(state = Seq(), action) {
  return state;
}

export function topSites(state = Seq(), action) {
  switch (action.type) {
    case actionTypes.RECEIVE_TOP_SITES:
      return action.topSites;
    default:
      return state;
  }
}

export function folderItemPreferences(state = new FolderItemPreferences(), action) {
  switch (action.type) {
    case actionTypes.RECEIVE_FOLDER_ITEM_PREFERENCES:
      return action.folderItemPreferences;

    default:
      return state;
  }
}
