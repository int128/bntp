import { Seq } from 'immutable';

import * as actionTypes from './actionTypes';

export function chromeAppFolders(state = Seq(), action) {
  switch (action.type) {
    case actionTypes.RECEIVE_CHROME_APPS:
      return action.chromeAppFolders;
    default:
      return state;
  }
}
