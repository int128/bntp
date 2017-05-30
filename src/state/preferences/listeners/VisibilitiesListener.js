import { visibilityRepository } from '../../../repositories';

import EventListenerManager from '../../../infrastructure/EventListenerManager';

import * as actionTypes from '../actionTypes';

const eventListenerManager = new EventListenerManager(visibilityRepository);

export default {
  [actionTypes.SUBSCRIBE_VISIBILITIES]: (action, dispatch, state) => {
    eventListenerManager.subscribe(() => dispatch({
      type: actionTypes.FETCH_VISIBILITIES,
    }));
  },

  [actionTypes.FETCH_VISIBILITIES]: (action, dispatch, state) => {
    const visibilities = visibilityRepository.findAll();
    dispatch({
      type: actionTypes.RECEIVE_VISIBILITIES,
      visibilities,
    });
  },

  [actionTypes.TOGGLE_VISIBILITY]: (action, dispatch, state) => {
    visibilityRepository.save(state.visibilities);
  },
};
