import * as actionTypes from './actionTypes';

export function selectTheme(theme) {
  return {
    type: actionTypes.SELECT_THEME,
    theme
  };
}

export function setAppPreference(map) {
  return {
    type: actionTypes.SET_APP_PREFERENCE,
    map
  };
}
