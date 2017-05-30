import { chromeAppRepository } from '../../../repositories';

import * as actionTypes from '../actionTypes';

import EventListenerManager from '../../../infrastructure/EventListenerManager';

const eventListenerManager = new EventListenerManager(chromeAppRepository);

export default {
  [actionTypes.SUBSCRIBE_CHROME_APPS]: (action, dispatch, state) => {
    eventListenerManager.subscribe(() => dispatch({type: actionTypes.FETCH_CHROME_APPS}));
  },

  [actionTypes.UNSUBSCRIBE_CHROME_APPS]: (action, dispatch, state) => {
    eventListenerManager.unsubscribe();
  },

  [actionTypes.FETCH_CHROME_APPS]: (action, dispatch, state) => {
    chromeAppRepository.findFolders(chromeAppFolders => dispatch({
      type: actionTypes.RECEIVE_CHROME_APPS,
      chromeAppFolders
    }))
  },
};
