import { Seq } from 'immutable';

import * as actionTypes from './actionTypes';

export function bookmarkFolders(state = Seq(), action) {
  switch (action.type) {
    case actionTypes.RECEIVE_BOOKMARKS:
      return action.bookmarkFolders;
    default:
      return state;
  }
}

export function chromePageFolders(state = Seq(), action) {
  return state;
}

export function chromeAppFolders(state = Seq(), action) {
  switch (action.type) {
    case actionTypes.RECEIVE_CHROME_APPS:
      return action.chromeAppFolders;
    default:
      return state;
  }
}

export function editingBookmark(state = null, action) {
  switch (action.type) {
    case actionTypes.OPEN_BOOKMARK_EDIT:
    case actionTypes.CHANGE_BOOKMARK_EDIT:
      return action.bookmark;
    case actionTypes.UPDATED_BOOKMARK:
    case actionTypes.REMOVED_BOOKMARK:
    case actionTypes.CANCEL_BOOKMARK_EDIT:
      return null;
    default:
      return state;
  }
}
