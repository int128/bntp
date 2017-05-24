import { bookmarkRepository, chromeAppRepository } from '../repositories';

export const RECEIVE_BOOKMARKS = 'RECEIVE_BOOKMARKS';
export const RECEIVE_CHROME_APPS = 'RECEIVE_CHROME_APPS';
export const OPEN_BOOKMARK_EDIT = 'OPEN_BOOKMARK_EDIT';
export const CHANGE_BOOKMARK_EDIT = 'CHANGE_BOOKMARK_EDIT';
export const SAVED_BOOKMARK_EDIT = 'SAVED_BOOKMARK_EDIT';
export const REMOVED_BOOKMARK_EDIT = 'REMOVED_BOOKMARK_EDIT';
export const CANCEL_BOOKMARK_EDIT = 'CANCEL_BOOKMARK_EDIT';

export function fetchBookmarks() {
  return dispatch => bookmarkRepository.findAll(bookmarkFolders => dispatch({
    type: RECEIVE_BOOKMARKS,
    bookmarkFolders
  }));
}

export function fetchApps() {
  return dispatch => chromeAppRepository.findFolders(chromeAppFolders => dispatch({
    type: RECEIVE_CHROME_APPS,
    chromeAppFolders,
  }));
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
  return dispatch => bookmarkRepository.update(bookmark, () => dispatch({
    type: SAVED_BOOKMARK_EDIT,
    bookmark
  }));
}

export function removeBookmarkEdit(bookmark) {
  return dispatch => bookmarkRepository.remove(bookmark, () => dispatch({
    type: REMOVED_BOOKMARK_EDIT,
    bookmark
  }));
}

export function cancelBookmarkEdit() {
  return {
    type: CANCEL_BOOKMARK_EDIT,
  };
}

export function initialize() {
  return dispatch => {
    dispatch(fetchBookmarks());
    bookmarkRepository.onChange(e => dispatch(fetchBookmarks()));

    dispatch(fetchApps());
    chromeAppRepository.onChange(e => dispatch(fetchApps()));
  };
}
