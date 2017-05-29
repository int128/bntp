import { RECEIVE_NETWORK_STATUS } from '../actions/notifications';

export function online(state = true, action) {
  switch (action.type) {
    case RECEIVE_NETWORK_STATUS:
      return action.online;
    default:
      return state;
  }
}

export function manifest(state = {}, action) {
  return state;
}
