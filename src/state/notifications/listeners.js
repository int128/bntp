import NetworkStatus from '../../infrastructure/NetworkStatus';
import EventListenerManager from '../../infrastructure/EventListenerManager';

import * as actionTypes from './actionTypes';

const networkStatus = new NetworkStatus();
const eventListenerManager = new EventListenerManager(networkStatus);

export default {
  [actionTypes.SUBSCRIBE_NETWORK_STATUS]: (action, dispatch, state) => {
    eventListenerManager.subscribe(() => dispatch({type: actionTypes.FETCH_NETWORK_STATUS}));
  },

  [actionTypes.UNSUBSCRIBE_NETWORK_STATUS]: (action, dispatch, state) => {
    eventListenerManager.unsubscribe();
  },

  [actionTypes.FETCH_NETWORK_STATUS]: (action, dispatch, state) => {
    dispatch({
      type: actionTypes.RECEIVE_NETWORK_STATUS,
      online: window.navigator.onLine,
    });
  }
};
