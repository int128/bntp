import {
  bookmarkRepository,
  chromeAppRepository,
  topSiteRepository,
  themeRepository,
  visibilityRepository,
} from '../repositories';

export const RECEIVE_BOOKMARKS = 'RECEIVE_BOOKMARKS';
export const TOGGLE_BOOKMARK_FOLDER_COLLAPSE = 'TOGGLE_BOOKMARK_FOLDER_COLLAPSE';
export const RECEIVE_APPS = 'RECEIVE_APPS';
export const RECEIVE_TOP_SITES = 'RECEIVE_TOP_SITES';
export const RECEIVE_THEMES = 'RECEIVE_THEMES';
export const SELECT_THEME = 'SELECT_THEME';
export const RECEIVE_VISIBILITIES = 'RECEIVE_VISIBILITIES';
export const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY';

export function fetchBookmarks() {
  return dispatch => bookmarkRepository.findAll(bookmarkTree => dispatch({
    type: RECEIVE_BOOKMARKS,
    bookmarkFolders: bookmarkTree.flatten(),
  }));
}

export function toggleBookmarkFolderCollapse(bookmarkFolder) {
  return {
    type: TOGGLE_BOOKMARK_FOLDER_COLLAPSE,
    bookmarkFolder,
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
  };
}

export function initializeTheme() {
  return dispatch => {
    const theme = themeRepository.findSelected() || themeRepository.first();
    dispatch(selectTheme(theme));

    const themes = themeRepository.findAll();
    dispatch({
      type: RECEIVE_THEMES,
      themes
    });

    themeRepository.onSelect(theme => dispatch(selectTheme(theme)));
  }
}

export function selectTheme(theme) {
  themeRepository.saveSelected(theme);

  // Apply theme on the root element
  document.documentElement.className = `Theme__${theme.id}`;

  return {
    type: SELECT_THEME,
    theme
  };
}

export function initializeVisibility() {
  return dispatch => {
    const visibilities = visibilityRepository.findAll();
    dispatch({
      type: RECEIVE_VISIBILITIES,
      visibilities
    });
  };
}

export function toggleVisibility(visibility) {
  return {
    type: TOGGLE_VISIBILITY,
    visibility
  };
}
