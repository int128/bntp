import { bookmarkRepository, chromeAppRepository } from '../repositories';
import * as ActionTypes from '../actions/bookmarks';
import EventListenerManager from '../infrastructure/EventListenerManager';

const bookmarksEventListenerManager = new EventListenerManager(bookmarkRepository);
const chromeAppsEventListenerManager = new EventListenerManager(chromeAppRepository);

export default {
  [ActionTypes.SUBSCRIBE_BOOKMARKS]: (action, dispatch, state) => {
    bookmarksEventListenerManager.subscribe(() => dispatch({type: ActionTypes.FETCH_BOOKMARKS}));
  },

  [ActionTypes.UNSUBSCRIBE_BOOKMARKS]: (action, dispatch, state) => {
    bookmarksEventListenerManager.unsubscribe();
  },

  [ActionTypes.FETCH_BOOKMARKS]: (action, dispatch, state) => {
    bookmarkRepository.findAll(bookmarkFolders => dispatch({
      type: ActionTypes.RECEIVE_BOOKMARKS,
      bookmarkFolders
    }))
  },

  [ActionTypes.UPDATING_BOOKMARK]: (action, dispatch, state) => {
    bookmarkRepository.update(action.bookmark, () => dispatch({
      type: ActionTypes.UPDATED_BOOKMARK,
      bookmark: action.bookmark
    }))
  },

  [ActionTypes.REMOVING_BOOKMARK]: (action, dispatch, state) => {
    bookmarkRepository.remove(action.bookmark, () => dispatch({
      type: ActionTypes.REMOVED_BOOKMARK,
      bookmark: action.bookmark
    }))
  },

  [ActionTypes.SUBSCRIBE_CHROME_APPS]: (action, dispatch, state) => {
    chromeAppsEventListenerManager.subscribe(() => dispatch({type: ActionTypes.FETCH_CHROME_APPS}));
  },

  [ActionTypes.UNSUBSCRIBE_CHROME_APPS]: (action, dispatch, state) => {
    chromeAppsEventListenerManager.unsubscribe();
  },

  [ActionTypes.FETCH_CHROME_APPS]: (action, dispatch, state) => {
    chromeAppRepository.findFolders(chromeAppFolders => dispatch({
      type: ActionTypes.RECEIVE_CHROME_APPS,
      chromeAppFolders
    }))
  },
};
