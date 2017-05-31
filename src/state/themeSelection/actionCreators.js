import * as actionTypes from './actionTypes';

export function subscribeSelectedTheme() {
  return {
    type: actionTypes.SUBSCRIBE_SELECTED_THEME,
  };
}

export function unsubscribeSelectedTheme() {
  return {
    type: actionTypes.UNSUBSCRIBE_SELECTED_THEME,
  };
}

export function selectTheme(theme) {
  return {
    type: actionTypes.SELECT_THEME,
    theme
  };
}
