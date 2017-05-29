import NetworkStatus from '../infrastructure/NetworkStatus';
import EventListenerManager from '../infrastructure/EventListenerManager';

import * as ActionTypes from '../actions/notifications';

const networkStatus = new NetworkStatus();
const eventListenerManager = new EventListenerManager(networkStatus);

export default {
  [ActionTypes.SUBSCRIBE_NETWORK_STATUS]: (action, dispatch, state) => {
    eventListenerManager.subscribe(() => dispatch({type: ActionTypes.FETCH_NETWORK_STATUS}));
  },

  [ActionTypes.UNSUBSCRIBE_NETWORK_STATUS]: (action, dispatch, state) => {
    eventListenerManager.unsubscribe();
  },

  [ActionTypes.FETCH_NETWORK_STATUS]: (action, dispatch, state) => {
    dispatch({
      type: ActionTypes.RECEIVE_NETWORK_STATUS,
      online: window.navigator.onLine,
    });
  }
};
