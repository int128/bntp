import { chromeAppRepository } from '../../repositories';

import * as actionTypes from './actionTypes';

export default {
  [actionTypes.FETCH_CHROME_APPS]: (action, dispatch) => {
    chromeAppRepository.findFolders(chromeAppFolders => dispatch({
      type: actionTypes.RECEIVE_CHROME_APPS,
      chromeAppFolders
    }))
  },
};
