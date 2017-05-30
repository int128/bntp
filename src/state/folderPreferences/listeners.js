import { folderPreferenceRepository } from '../../repositories';

import * as actionTypes from './actionTypes';

import EventListenerManager from '../../infrastructure/EventListenerManager';

const eventListenerManager = new EventListenerManager(folderPreferenceRepository);

export default {
  [actionTypes.SUBSCRIBE_FOLDER_PREFERENCE]: (action, dispatch, state) => {
    eventListenerManager.subscribe(() => dispatch({type: actionTypes.FETCH_FOLDER_PREFERENCE}));
  },

  [actionTypes.UNSUBSCRIBE_FOLDER_PREFERENCE]: (action, dispatch, state) => {
    eventListenerManager.unsubscribe();
  },

  [actionTypes.FETCH_FOLDER_PREFERENCE]: (action, dispatch, state) => {
    const folderPreference = folderPreferenceRepository.get();
    dispatch({
      type: actionTypes.RECEIVE_FOLDER_PREFERENCE,
      folderPreference
    });
  },

  [actionTypes.TOGGLE_FOLDER_COLLAPSE]: (action, dispatch, state) => {
    folderPreferenceRepository.save(state.folderPreference);
  },
};
