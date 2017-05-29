import {
  folderPreferenceRepository,
  themePreferenceRepository,
  visibilityRepository,
} from '../repositories';

import EventListenerManager from '../infrastructure/EventListenerManager';

import * as ActionTypes from '../actions/preferences';

const visibilitiesEventListenerManager = new EventListenerManager(visibilityRepository);
const themeEventListenerManager = new EventListenerManager(themePreferenceRepository);

export default {
  [ActionTypes.SUBSCRIBE_VISIBILITIES]: (action, dispatch, state) => {
    visibilitiesEventListenerManager.subscribe(() => dispatch({
      type: ActionTypes.FETCH_VISIBILITIES,
    }));
  },

  [ActionTypes.FETCH_VISIBILITIES]: (action, dispatch, state) => {
    const visibilities = visibilityRepository.findAll();
    dispatch({
      type: ActionTypes.RECEIVE_VISIBILITIES,
      visibilities,
    });
  },

  [ActionTypes.TOGGLE_VISIBILITY]: (action, dispatch, state) => {
    visibilityRepository.save(state.visibilities);
  },

  [ActionTypes.SUBSCRIBE_SELECTED_THEME]: (action, dispatch, state) => {
    themeEventListenerManager.subscribe(() => dispatch({
      type: ActionTypes.FETCH_SELECTED_THEME,
    }));
  },

  [ActionTypes.FETCH_SELECTED_THEME]: (action, dispatch, state) => {
    const theme = themePreferenceRepository.getOrDefault();
    dispatch({
      type: ActionTypes.RECEIVE_SELECTED_THEME,
      theme,
    });
  },

  [ActionTypes.RECEIVE_SELECTED_THEME]: (action, dispatch, state) => {
    const selectedTheme = action.theme;
    document.documentElement.className = `Theme__${selectedTheme.id}`;
    themePreferenceRepository.save(selectedTheme);
  },

  [ActionTypes.TOGGLE_FOLDER_COLLAPSE]: (action, dispatch, state) => {
    folderPreferenceRepository.save(state.folderPreference);
  },
};
