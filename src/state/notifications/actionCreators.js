import * as actionTypes from './actionTypes';

export function subscribeNetworkStatus() {
  return {
    type: actionTypes.SUBSCRIBE_NETWORK_STATUS,
  }
}

export function unsubscribeNetworkStatus() {
  return {
    type: actionTypes.UNSUBSCRIBE_NETWORK_STATUS,
  }
}
