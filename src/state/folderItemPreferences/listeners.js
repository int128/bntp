import { folderItemPreferenceRepository } from '../../repositories';

import * as actionTypes from './actionTypes';

import EventBrokers from '../../infrastructure/EventBrokers';

const eventBrokers = new EventBrokers({folderItemPreferenceRepository});

export default {
  [actionTypes.SUBSCRIBE_FOLDER_ITEM_PREFERENCES]: (action, dispatch) => {
    eventBrokers.folderItemPreferenceRepository.subscribe(() => dispatch({
      type: actionTypes.RECEIVE_FOLDER_ITEM_PREFERENCES,
      folderItemPreferences: folderItemPreferenceRepository.get()
    }));
  },

  [actionTypes.UNSUBSCRIBE_FOLDER_ITEM_PREFERENCES]: (action, dispatch) => {
    eventBrokers.folderItemPreferenceRepository.unsubscribe();
  },
};
