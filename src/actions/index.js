import {
  bookmarkRepository,
  chromeAppRepository,
  topSiteRepository,
  folderPreferenceRepository,
  themePreferenceRepository,
  visibilityRepository,
} from '../repositories';

import { networkStatusManager } from '../infrastructure';

export const RECEIVE_BOOKMARKS = 'RECEIVE_BOOKMARKS';
export const TOGGLE_FOLDER_COLLAPSE = 'TOGGLE_BOOKMARK_FOLDER_COLLAPSE';
export const RECEIVE_FOLDER_PREFERENCE = 'RECEIVE_FOLDER_PREFERENCES';
export const RECEIVE_CHROME_APPS = 'RECEIVE_CHROME_APPS';
export const RECEIVE_TOP_SITES = 'RECEIVE_TOP_SITES';
export const RECEIVE_THEMES = 'RECEIVE_THEMES';
export const SELECT_THEME = 'SELECT_THEME';
export const RECEIVE_VISIBILITIES = 'RECEIVE_VISIBILITIES';
export const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY';
export const RECEIVE_ONLINE = 'RECEIVE_ONLINE';
export const BEGIN_BOOKMARK_EDIT = 'BEGIN_BOOKMARK_EDIT';
export const COMMIT_BOOKMARK_EDIT = 'COMMIT_BOOKMARK_EDIT';
export const CANCEL_BOOKMARK_EDIT = 'CANCEL_BOOKMARK_EDIT';

export function fetchBookmarks() {
  return dispatch => bookmarkRepository.findAll(bookmarkFolders => dispatch({
    type: RECEIVE_BOOKMARKS,
    bookmarkFolders
  }));
}

export function toggleFolderCollapse(folder) {
  return {
    type: TOGGLE_FOLDER_COLLAPSE,
    folder,
  };
}

export function fetchApps() {
  return dispatch => chromeAppRepository.findFolders(chromeAppFolders => dispatch({
    type: RECEIVE_CHROME_APPS,
    chromeAppFolders,
  }));
}

export function fetchTopSites() {
  return dispatch => topSiteRepository.findAll(topSites => dispatch({
    type: RECEIVE_TOP_SITES,
    topSites,
  }));
}

export function initialize() {
  return dispatch => {
    dispatch(fetchTopSites());

    dispatch(fetchBookmarks());
    bookmarkRepository.onChange(e => dispatch(fetchBookmarks()));

    dispatch(fetchApps());
    chromeAppRepository.onChange(e => dispatch(fetchApps()));

    folderPreferenceRepository.onChange(folderPreference => dispatch({
      type: RECEIVE_FOLDER_PREFERENCE,
      folderPreference
    }));

    themePreferenceRepository.onChange(theme => dispatch(selectTheme(theme)));

    visibilityRepository.onChange(visibilities => dispatch({
      type: RECEIVE_VISIBILITIES,
      visibilities
    }));

    networkStatusManager.onChange(online => dispatch({
      type: RECEIVE_ONLINE,
      online
    }))
  };
}

export function selectTheme(theme) {
  return {
    type: SELECT_THEME,
    theme
  };
}

export function toggleVisibility(visibility) {
  return {
    type: TOGGLE_VISIBILITY,
    visibility
  };
}

export function beginBookmarkEdit(bookmark) {
  return {
    type: BEGIN_BOOKMARK_EDIT,
    bookmark
  };
}

export function commitBookmarkEdit(bookmark) {
  return {
    type: COMMIT_BOOKMARK_EDIT,
    bookmark
  };
}

export function cancelBookmarkEdit() {
  return {
    type: CANCEL_BOOKMARK_EDIT,
  };
}
