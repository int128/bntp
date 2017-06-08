import { Seq } from 'immutable';

import * as actionTypes from './actionTypes';

import Visibilities from '../../models/Visibilities';

export function visibilities(state = new Visibilities(), action) {
  switch (action.type) {
    case actionTypes.RECEIVE_VISIBILITIES:
      return action.visibilities;
    case actionTypes.TOGGLE_VISIBILITY:
      return state.toggle(action.visibility);
    default:
      return state;
  }
}

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
