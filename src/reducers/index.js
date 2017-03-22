import { combineReducers } from 'redux';

import { RECEIVE_BOOKMARKS } from '../actions';

function bookmarks(state = {folders: []}, action) {
  switch (action.type) {
    case RECEIVE_BOOKMARKS:
      return {
        folders: action.folders
      };
    default:
      return state;
  }
}

export default combineReducers({
  bookmarks
})
