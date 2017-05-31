import * as actionTypes from './actionTypes';

export function subscribeBookmarkPreferences() {
  return {
    type: actionTypes.SUBSCRIBE_BOOKMARK_PREFERENCE,
  }
}

export function unsubscribeBookmarkPreferences() {
  return {
    type: actionTypes.UNSUBSCRIBE_BOOKMARK_PREFERENCE,
  }
}
