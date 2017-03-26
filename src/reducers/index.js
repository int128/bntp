import { combineReducers } from 'redux';

import { RECEIVE_BOOKMARKS, TOGGLE_FOLDER_COLLAPSE } from '../actions';

function bookmarkFolders(state = [], action) {
  switch (action.type) {
    case RECEIVE_BOOKMARKS:
      return action.folders;
    default:
      return state;
  }
}

function collapsedFolderIds(state = [], action) {
  switch (action.type) {
    case TOGGLE_FOLDER_COLLAPSE:
      if (action.collapsed) {
        return [action.folderId, ...state];
      } else {
        return state.filter(folderId => folderId !== action.folderId);
      }
    default:
      return state;
  }
}

export default combineReducers({
  bookmarkFolders,
  collapsedFolderIds
})
