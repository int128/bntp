import { Seq } from 'immutable';

import * as ActionTypes from '../actions/bookmarks';

export function bookmarkFolders(state = Seq(), action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_BOOKMARKS:
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
    case ActionTypes.RECEIVE_CHROME_APPS:
      return action.chromeAppFolders;
    default:
      return state;
  }
}

export function editingBookmark(state = null, action) {
  switch (action.type) {
    case ActionTypes.OPEN_BOOKMARK_EDIT:
    case ActionTypes.CHANGE_BOOKMARK_EDIT:
      return action.bookmark;
    case ActionTypes.UPDATED_BOOKMARK:
    case ActionTypes.REMOVED_BOOKMARK:
    case ActionTypes.CANCEL_BOOKMARK_EDIT:
      return null;
    default:
      return state;
  }
}
