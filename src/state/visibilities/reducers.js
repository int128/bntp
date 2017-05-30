import * as actionTypes from './actionTypes';

import Visibilities from '../../models/preferences/Visibilities';

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
