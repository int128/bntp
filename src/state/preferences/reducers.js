import * as actionTypes from './actionTypes';

import AppPreference from '../../models/AppPreference';

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
