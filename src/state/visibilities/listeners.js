import { visibilityRepository } from '../../repositories';

import EventBrokers from '../../infrastructure/EventBrokers';

import * as actionTypes from './actionTypes';

const eventBrokers = new EventBrokers({visibilityRepository});

export default {
  [actionTypes.SUBSCRIBE_VISIBILITIES]: (action, dispatch) => {
    eventBrokers.visibilityRepository.subscribe(() => dispatch({
      type: actionTypes.FETCH_VISIBILITIES,
    }));
  },

  [actionTypes.UNSUBSCRIBE_VISIBILITIES]: (action, dispatch) => {
    eventBrokers.visibilityRepository.unsubscribe();
  },

  [actionTypes.FETCH_VISIBILITIES]: (action, dispatch) => {
    const visibilities = visibilityRepository.findAll();
    dispatch({
      type: actionTypes.RECEIVE_VISIBILITIES,
      visibilities,
    });
  },

  [actionTypes.TOGGLE_VISIBILITY]: (action, dispatch, store) => {
    visibilityRepository.save(store.getState().visibilities);
  },
};
