import { combineReducers } from 'redux';

import {
  RECEIVE_BOOKMARKS,
  RECEIVE_APPS,
  RECEIVE_TOP_SITES,
  TOGGLE_FOLDER_COLLAPSE,
  SELECT_THEME,
  LOCAL_STORAGE_CHANGED,
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
    case LOCAL_STORAGE_CHANGED:
      return action.state.collapsedFolderIds;
    default:
      return state;
  }
}

function selectedThemeName(state = 'light', action) {
  switch (action.type) {
    case SELECT_THEME:
      return action.theme.name;
    case LOCAL_STORAGE_CHANGED:
      return action.state.selectedThemeName;
    default:
      return state;
  }
}

export default combineReducers({
  bookmarkFolders,
  apps,
  topSites,
  collapsedFolderIds,
  selectedThemeName,
})
