import * as actionTypes from './actionTypes';

export function setAppPreference(map) {
  return {
    type: actionTypes.SET_APP_PREFERENCE,
    map
  };
}
