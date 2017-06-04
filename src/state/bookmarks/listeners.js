import { bookmarkRepository } from '../../repositories';

import * as actionTypes from './actionTypes';

import EventBrokers from '../../infrastructure/EventBrokers';

const eventBrokers = new EventBrokers({bookmarkRepository});

export default {
  [actionTypes.SUBSCRIBE_BOOKMARKS]: (action, dispatch) => {
    eventBrokers.bookmarkRepository.subscribe(() => dispatch({
      type: actionTypes.FETCH_BOOKMARKS
    }));
  },

  [actionTypes.UNSUBSCRIBE_BOOKMARKS]: (action, dispatch) => {
    eventBrokers.bookmarkRepository.unsubscribe();
  },

  [actionTypes.FETCH_BOOKMARKS]: (action, dispatch) => {
    bookmarkRepository.findAll(bookmarkFolders => dispatch({
      type: actionTypes.RECEIVE_BOOKMARKS,
      bookmarkFolders
    }));
  },
};
