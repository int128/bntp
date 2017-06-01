import { chromeAppRepository } from '../../repositories';

import * as actionTypes from './actionTypes';

import EventBrokers from '../../infrastructure/EventBrokers';

const eventBrokers = new EventBrokers({chromeAppRepository});

export default {
  [actionTypes.SUBSCRIBE_CHROME_APPS]: (action, dispatch) => {
    eventBrokers.chromeAppRepository.subscribe(() => dispatch({type: actionTypes.FETCH_CHROME_APPS}));
  },

  [actionTypes.UNSUBSCRIBE_CHROME_APPS]: (action, dispatch) => {
    eventBrokers.chromeAppRepository.unsubscribe();
  },

  [actionTypes.FETCH_CHROME_APPS]: (action, dispatch) => {
    chromeAppRepository.findFolders(chromeAppFolders => dispatch({
      type: actionTypes.RECEIVE_CHROME_APPS,
      chromeAppFolders
    }))
  },
};
