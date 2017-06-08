import { RECEIVE_NETWORK_STATUS } from './actionTypes';

export function networkStatus(state = true, action) {
  switch (action.type) {
    case RECEIVE_NETWORK_STATUS:
      return action.networkStatus;
    default:
      return state;
  }
}

export function manifest(state = {}, action) {
  return state;
}
