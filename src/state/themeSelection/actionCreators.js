import * as actionTypes from './actionTypes';

export function selectTheme(theme) {
  return {
    type: actionTypes.SELECT_THEME,
    theme
  };
}
