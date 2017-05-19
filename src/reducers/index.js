import { combineReducers } from 'redux';
import { Seq } from 'immutable';

import {
  RECEIVE_BOOKMARKS,
  TOGGLE_FOLDER_COLLAPSE,
  RECEIVE_FOLDER_PREFERENCE,
  RECEIVE_CHROME_APPS,
  RECEIVE_TOP_SITES,
  RECEIVE_THEMES,
  SELECT_THEME,
  RECEIVE_VISIBILITIES,
  TOGGLE_VISIBILITY,
  RECEIVE_ONLINE,
  OPEN_BOOKMARK_EDIT,
  CHANGE_BOOKMARK_EDIT,
  SAVED_BOOKMARK_EDIT,
  REMOVED_BOOKMARK_EDIT,
  CANCEL_BOOKMARK_EDIT,
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

function chromePageFolders(state = Seq(), action) {
  return state;
}

function chromeAppFolders(state = Seq(), action) {
  switch (action.type) {
    case RECEIVE_CHROME_APPS:
      return action.chromeAppFolders;
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
    case RECEIVE_FOLDER_PREFERENCE:
      return action.folderPreference;
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

function online(state = false, action) {
  switch (action.type) {
    case RECEIVE_ONLINE:
      return action.online;
    default:
      return state;
  }
}

function editingBookmark(state = null, action) {
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

export default combineReducers({
  bookmarkFolders,
  chromePageFolders,
  chromeAppFolders,
  topSites,
  folderPreference,
  themes,
  selectedTheme,
  visibilities,
  online,
  editingBookmark,
})
