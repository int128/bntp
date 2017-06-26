import * as actionTypes from './actionTypes';

import Themes from '../../models/Themes';
import AppPreference from '../../models/AppPreference';

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

export function appPreference(state = new AppPreference(), action) {
  switch (action.type) {
    case actionTypes.RECEIVE_APP_PREFERENCE:
      return action.appPreference;
    case actionTypes.SET_APP_PREFERENCE:
      return state.merge(action.map);
    default:
      return state;
  }
}
