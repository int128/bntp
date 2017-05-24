import { Seq } from 'immutable';

import { RECEIVE_TOP_SITES } from '../actions/topsites';

export function topSites(state = Seq(), action) {
  switch (action.type) {
    case RECEIVE_TOP_SITES:
      return action.topSites;
    default:
      return state;
  }
}
