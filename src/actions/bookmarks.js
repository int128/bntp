export const SUBSCRIBE_BOOKMARKS = 'SUBSCRIBE_BOOKMARKS';
export const UNSUBSCRIBE_BOOKMARKS = 'UNSUBSCRIBE_BOOKMARKS';
export const FETCH_BOOKMARKS = 'FETCH_BOOKMARKS';
export const RECEIVE_BOOKMARKS = 'RECEIVE_BOOKMARKS';
export const UPDATING_BOOKMARK = 'UPDATING_BOOKMARK';
export const UPDATED_BOOKMARK = 'UPDATED_BOOKMARK';
export const REMOVING_BOOKMARK = 'REMOVING_BOOKMARK';
export const REMOVED_BOOKMARK = 'REMOVED_BOOKMARK';

export const SUBSCRIBE_CHROME_APPS = 'SUBSCRIBE_CHROME_APPS';
export const UNSUBSCRIBE_CHROME_APPS = 'UNSUBSCRIBE_CHROME_APPS';
export const FETCH_CHROME_APPS = 'FETCH_CHROME_APPS';
export const RECEIVE_CHROME_APPS = 'RECEIVE_CHROME_APPS';

export const OPEN_BOOKMARK_EDIT = 'OPEN_BOOKMARK_EDIT';
export const CHANGE_BOOKMARK_EDIT = 'CHANGE_BOOKMARK_EDIT';
export const CANCEL_BOOKMARK_EDIT = 'CANCEL_BOOKMARK_EDIT';

export function subscribeBookmarks() {
  return {
    type: SUBSCRIBE_BOOKMARKS,
  }
}

export function unsubscribeBookmarks() {
  return {
    type: UNSUBSCRIBE_BOOKMARKS,
  }
}

export function openBookmarkEdit(bookmark) {
  return {
    type: OPEN_BOOKMARK_EDIT,
    bookmark
  };
}

export function changeBookmarkEdit(bookmark) {
  return {
    type: CHANGE_BOOKMARK_EDIT,
    bookmark
  };
}

export function saveBookmarkEdit(bookmark) {
  return {
    type: UPDATING_BOOKMARK,
    bookmark
  };
}

export function removeBookmarkEdit(bookmark) {
  return {
    type: REMOVING_BOOKMARK,
    bookmark
  };
}

export function cancelBookmarkEdit() {
  return {
    type: CANCEL_BOOKMARK_EDIT,
  };
}

export function subscribeChromeApps() {
  return {
    type: SUBSCRIBE_CHROME_APPS,
  }
}

export function unsubscribeChromeApps() {
  return {
    type: UNSUBSCRIBE_CHROME_APPS,
  }
}
