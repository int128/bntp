export const RECEIVE_BOOKMARKS = 'RECEIVE_BOOKMARKS';
export const TOGGLE_FOLDER_COLLAPSE = 'TOGGLE_FOLDER_COLLAPSE';

function groupBookmarksByFolder(tree) {
  function traverse(folder) {
    const sites      = folder.children.filter(child => child.url)
    const subfolders = folder.children.filter(child => !child.url)
    const aggregated = []
    if (sites.length > 0) {
      folder.children = sites
      aggregated.push(folder)
    }
    return Array.prototype.concat.apply(aggregated, subfolders.map(traverse))
  }
  return traverse({children: tree})
}

export function receiveBookmarks(tree) {
  return {
    type: RECEIVE_BOOKMARKS,
    folders: groupBookmarksByFolder(tree)
  };
}

export function fetchBookmarks(dispatch) {
  return window.chrome.bookmarks.getTree(tree => dispatch(receiveBookmarks(tree)));
}

export function toggleFolderCollapse(folder, collapsed) {
  return {
    type: TOGGLE_FOLDER_COLLAPSE,
    folder,
    collapsed
  };
}
