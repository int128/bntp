import * as actionTypes from './actionTypes';

export function subscribeBookmarks() {
  return {
    type: actionTypes.SUBSCRIBE_BOOKMARKS,
  }
}

export function unsubscribeBookmarks() {
  return {
    type: actionTypes.UNSUBSCRIBE_BOOKMARKS,
  }
}

export function openBookmarkEdit(bookmark) {
  return {
    type: actionTypes.OPEN_BOOKMARK_EDIT,
    bookmark
  };
}

export function changeBookmarkEdit(bookmark) {
  return {
    type: actionTypes.CHANGE_BOOKMARK_EDIT,
    bookmark
  };
}

export function saveBookmarkEdit(bookmark) {
  return {
    type: actionTypes.UPDATING_BOOKMARK,
    bookmark
  };
}

export function removeBookmarkEdit(bookmark) {
  return {
    type: actionTypes.REMOVING_BOOKMARK,
    bookmark
  };
}

export function cancelBookmarkEdit() {
  return {
    type: actionTypes.CANCEL_BOOKMARK_EDIT,
  };
}
