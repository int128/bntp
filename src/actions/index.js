export const RECEIVE_BOOKMARKS = 'RECEIVE_BOOKMARKS';
export const TOGGLE_FOLDER_COLLAPSE = 'TOGGLE_FOLDER_COLLAPSE';
export const RECEIVE_APPS = 'RECEIVE_APPS';
export const RECEIVE_TOP_SITES = 'RECEIVE_TOP_SITES';

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

export function toggleFolderCollapse(folderId, collapsed) {
  return {
    type: TOGGLE_FOLDER_COLLAPSE,
    folderId,
    collapsed
  };
}

export function fetchApps() {
  return (dispatch) => window.chrome.management.getAll(items => dispatch({
    type: RECEIVE_APPS,
    items: items.filter(item => /\w+_app/.test(item.type))
  }));
}

export function fetchTopSites() {
  return (dispatch) => window.chrome.topSites.get(items => dispatch({
    type: RECEIVE_TOP_SITES,
    items: items
  }));
}
