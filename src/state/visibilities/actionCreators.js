import * as actionTypes from './actionTypes';

export function subscribeVisibilities() {
  return {
    type: actionTypes.SUBSCRIBE_VISIBILITIES,
  };
}

export function unsubscribeVisibilities() {
  return {
    type: actionTypes.UNSUBSCRIBE_VISIBILITIES,
  };
}

export function toggleVisibility(visibility) {
  return {
    type: actionTypes.TOGGLE_VISIBILITY,
    visibility
  };
}
