import * as actionTypes from './actionTypes';

import Visibilities from '../../models/Visibilities';
import Themes from '../../models/Themes';

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

export function themes(state = new Themes(), action) {
  switch (action.type) {
    case actionTypes.RECEIVE_THEMES:
      return action.themes;
    case actionTypes.SELECT_THEME:
      return state.select(action.theme);
    default:
      return state;
  }
}
