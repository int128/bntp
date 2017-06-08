import * as actionTypes from './actionTypes';

export function toggleVisibility(visibility) {
  return {
    type: actionTypes.TOGGLE_VISIBILITY,
    visibility
  };
}

export function selectTheme(theme) {
  return {
    type: actionTypes.SELECT_THEME,
    theme
  };
}
