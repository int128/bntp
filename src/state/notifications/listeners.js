import NetworkStatus from '../../infrastructure/NetworkStatus';
import EventBrokers from '../../infrastructure/EventBrokers';

import * as actionTypes from './actionTypes';

const networkStatus = new NetworkStatus();
const eventBrokers = new EventBrokers({networkStatus});

export default {
  [actionTypes.SUBSCRIBE_NETWORK_STATUS]: (action, dispatch) => {
    eventBrokers.networkStatus.subscribe(() => dispatch({
      type: actionTypes.FETCH_NETWORK_STATUS
    }));
  },

  [actionTypes.UNSUBSCRIBE_NETWORK_STATUS]: (action, dispatch) => {
    eventBrokers.networkStatus.unsubscribe();
  },

  [actionTypes.FETCH_NETWORK_STATUS]: (action, dispatch) => {
    dispatch({
      type: actionTypes.RECEIVE_NETWORK_STATUS,
      online: window.navigator.onLine,
    });
  }
};
