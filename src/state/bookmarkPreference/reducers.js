import * as actionTypes from './actionTypes';

import BookmarkPreference from '../../models/BookmarkPreference';

export function bookmarkPreference(state = new BookmarkPreference(), action) {
  switch (action.type) {
    case actionTypes.RECEIVE_BOOKMARK_PREFERENCE:
      return action.bookmarkPreference;
    default:
      return state;
  }
}
