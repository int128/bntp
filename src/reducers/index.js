import { combineReducers } from 'redux';

import {
  RECEIVE_BOOKMARKS,
  RECEIVE_APPS,
  RECEIVE_TOP_SITES,
  TOGGLE_FOLDER_COLLAPSE,
} from '../actions';

function bookmarkFolders(state = [], action) {
  switch (action.type) {
    case RECEIVE_BOOKMARKS:
      return action.items;
    default:
      return state;
  }
}

function apps(state = [], action) {
  switch (action.type) {
    case RECEIVE_APPS:
      return action.items;
    default:
      return state;
  }
}

function topSites(state = [], action) {
  switch (action.type) {
    case RECEIVE_TOP_SITES:
      return action.items;
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
  apps,
  topSites,
  collapsedFolderIds,
})
