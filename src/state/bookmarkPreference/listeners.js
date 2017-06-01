import { bookmarkPreferenceRepository } from '../../repositories';

import * as actionTypes from './actionTypes';

import EventBrokers from '../../infrastructure/EventBrokers';

const eventBrokers = new EventBrokers({bookmarkPreferenceRepository});

export default {
  [actionTypes.SUBSCRIBE_BOOKMARK_PREFERENCE]: (action, dispatch) => {
    eventBrokers.bookmarkPreferenceRepository.subscribe(() => dispatch({
      type: actionTypes.RECEIVE_BOOKMARK_PREFERENCE,
      bookmarkPreference: bookmarkPreferenceRepository.get(),
    }));
  },

  [actionTypes.UNSUBSCRIBE_BOOKMARK_PREFERENCE]: (action, dispatch) => {
    eventBrokers.bookmarkPreferenceRepository.unsubscribe();
  },
};
