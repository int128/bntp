import { bookmarkRepository } from '../../repositories';

import * as actionTypes from './actionTypes';

export default {
  [actionTypes.FETCH_BOOKMARKS]: (action, dispatch) => {
    bookmarkRepository.findAll(bookmarkFolders => dispatch({
      type: actionTypes.RECEIVE_BOOKMARKS,
      bookmarkFolders
    }));
  },
};
