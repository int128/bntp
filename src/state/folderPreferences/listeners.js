import { folderPreferenceRepository } from '../../repositories';

import * as actionTypes from './actionTypes';

import EventBrokers from '../../infrastructure/EventBrokers';

const eventBrokers = new EventBrokers({folderPreferenceRepository});

export default {
  [actionTypes.SUBSCRIBE_FOLDER_PREFERENCES]: (action, dispatch) => {
    eventBrokers.folderPreferenceRepository.subscribe(() => dispatch({
      type: actionTypes.RECEIVE_FOLDER_PREFERENCES,
      folderPreferences: folderPreferenceRepository.get()
    }));
  },

  [actionTypes.UNSUBSCRIBE_FOLDER_PREFERENCES]: (action, dispatch) => {
    eventBrokers.folderPreferenceRepository.unsubscribe();
  },

  [actionTypes.TOGGLE_FOLDER]: (action, dispatch, store) => {
    const { folderPreferences } = store.getState();
    folderPreferenceRepository.save(folderPreferences);
  },
};
