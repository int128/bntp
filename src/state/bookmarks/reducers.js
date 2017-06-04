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
