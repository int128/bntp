export const RECEIVE_BOOKMARKS = 'RECEIVE_BOOKMARKS';
export const TOGGLE_FOLDER_COLLAPSE = 'TOGGLE_FOLDER_COLLAPSE';
export const RECEIVE_APPS = 'RECEIVE_APPS';
export const RECEIVE_TOP_SITES = 'RECEIVE_TOP_SITES';
export const SELECT_THEME = 'SELECT_THEME';
export const LOCAL_STORAGE_CHANGED = 'LOCAL_STORAGE_CHANGED';

function groupBookmarksByFolder(tree) {
  function traverse(folder) {
    const sites      = folder.children.filter(child => child.url);
    const subfolders = folder.children.filter(child => !child.url);
    const flatten    = subfolders.map(traverse);
    if (sites.length > 0) {
      folder.children = sites;
      return [folder].concat(...flatten);
    } else {
      return [].concat(...flatten);
    }
  }
  return traverse({children: tree})
}

export function fetchBookmarks() {
  return (dispatch) => window.chrome.bookmarks.getTree(tree => dispatch({
    type: RECEIVE_BOOKMARKS,
    items: groupBookmarksByFolder(tree)
  }));
}

export function registerBookmarksListener() {
  return (dispatch) => {
    const listener = () => dispatch(fetchBookmarks());
    window.chrome.bookmarks.onCreated.addListener(listener);
    window.chrome.bookmarks.onRemoved.addListener(listener);
    window.chrome.bookmarks.onChanged.addListener(listener);
    window.chrome.bookmarks.onMoved.addListener(listener);
    window.chrome.bookmarks.onChildrenReordered.addListener(listener);
  };
}

export function toggleFolderCollapse(folderId, collapsed) {
  return {
    type: TOGGLE_FOLDER_COLLAPSE,
    folderId,
    collapsed
  };
}

export function fetchApps() {
  return dispatch => window.chrome.management.getAll(items => dispatch({
    type: RECEIVE_APPS,
    items: items.filter(item => /\w+_app/.test(item.type))
  }));
}

export function fetchTopSites() {
  return dispatch => window.chrome.topSites.get(items => dispatch({
    type: RECEIVE_TOP_SITES,
    items
  }));
}

export function selectTheme(theme) {
  return {
    type: SELECT_THEME,
    theme
  }
}

export function localStorageChanged(state) {
  return {
    type: LOCAL_STORAGE_CHANGED,
    state
  };
}
