import { Seq } from 'immutable';

import * as actionTypes from './actionTypes';

export function themes(state = Seq(), action) {
  return state;
}

export function selectedTheme(state = null, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_SELECTED_THEME:
    case actionTypes.SELECT_THEME:
      return action.theme;
    default:
      return state;
  }
}
