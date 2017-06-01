import { folderPreferenceRepository } from '../../repositories';

import * as actionTypes from './actionTypes';

import EventBrokers from '../../infrastructure/EventBrokers';

const eventBrokers = new EventBrokers({folderPreferenceRepository});

export default {
  [actionTypes.SUBSCRIBE_FOLDER_PREFERENCE]: (action, dispatch) => {
    eventBrokers.folderPreferenceRepository.subscribe(() => dispatch({
      type: actionTypes.FETCH_FOLDER_PREFERENCE
    }));
  },

  [actionTypes.UNSUBSCRIBE_FOLDER_PREFERENCE]: (action, dispatch) => {
    eventBrokers.folderPreferenceRepository.unsubscribe();
  },

  [actionTypes.FETCH_FOLDER_PREFERENCE]: (action, dispatch) => {
    const folderPreference = folderPreferenceRepository.get();
    dispatch({
      type: actionTypes.RECEIVE_FOLDER_PREFERENCE,
      folderPreference
    });
  },

  [actionTypes.TOGGLE_FOLDER_COLLAPSE]: (action, dispatch, store) => {
    folderPreferenceRepository.save(store.getState().folderPreference);
  },
};
