import { bookmarkPreferenceRepository } from '../../repositories';

import * as actionTypes from './actionTypes';

import EventListenerManager from '../../infrastructure/EventListenerManager';

const eventListenerManager = new EventListenerManager(bookmarkPreferenceRepository);

export default {
  [actionTypes.SUBSCRIBE_BOOKMARK_PREFERENCE]: (action, dispatch) => {
    eventListenerManager.subscribe(() => dispatch({
      type: actionTypes.RECEIVE_BOOKMARK_PREFERENCE,
      bookmarkPreference: bookmarkPreferenceRepository.get(),
    }));
  },

  [actionTypes.UNSUBSCRIBE_BOOKMARK_PREFERENCE]: (action, dispatch) => {
    eventListenerManager.unsubscribe();
  },
};
