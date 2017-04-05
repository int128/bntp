import { combineReducers } from 'redux';
import { Seq } from 'immutable';

import {
  RECEIVE_BOOKMARKS,
  TOGGLE_FOLDER_COLLAPSE,
  RECEIVE_COLLAPSED_FOLDERS,
  RECEIVE_APPS,
  RECEIVE_TOP_SITES,
  RECEIVE_THEMES,
  SELECT_THEME,
  RECEIVE_VISIBILITIES,
  TOGGLE_VISIBILITY,
} from '../actions';

import {
  Visibilities,
  FolderPreference,
} from '../models';

function bookmarkFolders(state = Seq(), action) {
  switch (action.type) {
    case RECEIVE_BOOKMARKS:
      return action.bookmarkFolders;
    default:
      return state;
  }
}

function apps(state = Seq(), action) {
  switch (action.type) {
    case RECEIVE_APPS:
      return action.apps;
    default:
      return state;
  }
}

function topSites(state = Seq(), action) {
  switch (action.type) {
    case RECEIVE_TOP_SITES:
      return action.topSites;
    default:
      return state;
  }
}

function folderPreference(state = new FolderPreference(), action) {
  switch (action.type) {
    case TOGGLE_FOLDER_COLLAPSE:
      return state.toggle(action.folder);
    case RECEIVE_COLLAPSED_FOLDERS:
      return action.collapsedFolders;
    default:
      return state;
  }
}

function themes(state = Seq(), action) {
  switch (action.type) {
    case RECEIVE_THEMES:
      return action.themes;
    default:
      return state;
  }
}

function selectedTheme(state = null, action) {
  switch (action.type) {
    case SELECT_THEME:
      return action.theme;
    default:
      return state;
  }
}

function visibilities(state = new Visibilities(), action) {
  switch (action.type) {
    case RECEIVE_VISIBILITIES:
      return action.visibilities;
    case TOGGLE_VISIBILITY:
      return state.toggle(action.visibility);
    default:
      return state;
  }
}

export default combineReducers({
  bookmarkFolders,
  apps,
  topSites,
  folderPreference,
  themes,
  selectedTheme,
  visibilities,
})
