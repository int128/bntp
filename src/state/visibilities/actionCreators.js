import * as actionTypes from './actionTypes';

export function toggleVisibility(visibility) {
  return {
    type: actionTypes.TOGGLE_VISIBILITY,
    visibility
  };
}
