export const RECEIVE_BOOKMARKS = 'RECEIVE_BOOKMARKS';
export const TOGGLE_FOLDER_COLLAPSE = 'TOGGLE_FOLDER_COLLAPSE';

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

export function receiveBookmarks(tree) {
  return {
    type: RECEIVE_BOOKMARKS,
    folders: groupBookmarksByFolder(tree)
  };
}

export function fetchBookmarks() {
  return (dispatch) => window.chrome.bookmarks.getTree(tree => dispatch(receiveBookmarks(tree)));
}

export function toggleFolderCollapse(folderId, collapsed) {
  return {
    type: TOGGLE_FOLDER_COLLAPSE,
    folderId,
    collapsed
  };
}
