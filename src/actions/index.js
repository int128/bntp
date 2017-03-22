export const RECEIVE_BOOKMARKS = 'RECEIVE_BOOKMARKS';

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
  const folders = traverse({children: tree})
  //folders.push(ChromePages)
  return folders
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
