import { RECEIVE_ONLINE } from '../actions/notifications';

export function online(state = false, action) {
  switch (action.type) {
    case RECEIVE_ONLINE:
      return action.online;
    default:
      return state;
  }
}

export function manifest(state = {}, action) {
  return state;
}
