import { bookmarkRepository } from '../../../repositories';

import * as actionTypes from '../actionTypes';

import EventListenerManager from '../../../infrastructure/EventListenerManager';

const eventListenerManager = new EventListenerManager(bookmarkRepository);

export default {
  [actionTypes.SUBSCRIBE_BOOKMARKS]: (action, dispatch, state) => {
    eventListenerManager.subscribe(() => dispatch({type: actionTypes.FETCH_BOOKMARKS}));
  },

  [actionTypes.UNSUBSCRIBE_BOOKMARKS]: (action, dispatch, state) => {
    eventListenerManager.unsubscribe();
  },

  [actionTypes.FETCH_BOOKMARKS]: (action, dispatch, state) => {
    bookmarkRepository.findAll(bookmarkFolders => dispatch({
      type: actionTypes.RECEIVE_BOOKMARKS,
      bookmarkFolders
    }))
  },

  [actionTypes.UPDATING_BOOKMARK]: (action, dispatch, state) => {
    bookmarkRepository.update(action.bookmark, () => dispatch({
      type: actionTypes.UPDATED_BOOKMARK,
      bookmark: action.bookmark
    }))
  },

  [actionTypes.REMOVING_BOOKMARK]: (action, dispatch, state) => {
    bookmarkRepository.remove(action.bookmark, () => dispatch({
      type: actionTypes.REMOVED_BOOKMARK,
      bookmark: action.bookmark
    }))
  },
};
