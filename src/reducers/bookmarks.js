import { Seq } from 'immutable';

import {
  RECEIVE_BOOKMARKS,
  RECEIVE_CHROME_APPS,
  OPEN_BOOKMARK_EDIT,
  CHANGE_BOOKMARK_EDIT,
  SAVED_BOOKMARK_EDIT,
  REMOVED_BOOKMARK_EDIT,
  CANCEL_BOOKMARK_EDIT,
} from '../actions/bookmarks';

export function bookmarkFolders(state = Seq(), action) {
  switch (action.type) {
    case RECEIVE_BOOKMARKS:
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
    case RECEIVE_CHROME_APPS:
      return action.chromeAppFolders;
    default:
      return state;
  }
}

export function editingBookmark(state = null, action) {
  switch (action.type) {
    case OPEN_BOOKMARK_EDIT:
    case CHANGE_BOOKMARK_EDIT:
      return action.bookmark;
    case SAVED_BOOKMARK_EDIT:
    case REMOVED_BOOKMARK_EDIT:
    case CANCEL_BOOKMARK_EDIT:
      return null;
    default:
      return state;
  }
}
