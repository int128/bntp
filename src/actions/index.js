import {
  bookmarkRepository,
  chromeAppRepository,
  topSiteRepository,
  collapsedFolderRepository,
  themePreferenceRepository,
  visibilityRepository,
} from '../repositories';

export const RECEIVE_BOOKMARKS = 'RECEIVE_BOOKMARKS';
export const TOGGLE_FOLDER_COLLAPSE = 'TOGGLE_BOOKMARK_FOLDER_COLLAPSE';
export const RECEIVE_COLLAPSED_FOLDERS = 'RECEIVE_COLLAPSED_FOLDERS';
export const RECEIVE_APPS = 'RECEIVE_APPS';
export const RECEIVE_TOP_SITES = 'RECEIVE_TOP_SITES';
export const RECEIVE_THEMES = 'RECEIVE_THEMES';
export const SELECT_THEME = 'SELECT_THEME';
export const RECEIVE_VISIBILITIES = 'RECEIVE_VISIBILITIES';
export const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY';

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
  return dispatch => chromeAppRepository.findAll(apps => dispatch({
    type: RECEIVE_APPS,
    apps,
  }));
}

export function fetchTopSites() {
  return dispatch => topSiteRepository.findAll(topSites => dispatch({
    type: RECEIVE_TOP_SITES,
    topSites,
  }));
}

export function initializeListeners() {
  return dispatch => {
    bookmarkRepository.onChange(e => dispatch(fetchBookmarks()));
    chromeAppRepository.onChange(e => dispatch(fetchApps()));
    collapsedFolderRepository.onChange(collapsedFolders => dispatch({
      type: RECEIVE_COLLAPSED_FOLDERS,
      collapsedFolders
    }));
    themePreferenceRepository.onChange(theme => dispatch(selectTheme(theme)));
    visibilityRepository.onChange(visibilities => dispatch({
      type: RECEIVE_VISIBILITIES,
      visibilities
    }));
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
