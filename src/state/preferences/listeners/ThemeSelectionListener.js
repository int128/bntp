import { themePreferenceRepository } from '../../../repositories';

import EventListenerManager from '../../../infrastructure/EventListenerManager';

import * as actionTypes from '../actionTypes';

const eventListenerManager = new EventListenerManager(themePreferenceRepository);

export default {
  [actionTypes.SUBSCRIBE_SELECTED_THEME]: (action, dispatch, state) => {
    eventListenerManager.subscribe(() => dispatch({
      type: actionTypes.FETCH_SELECTED_THEME,
    }));
  },

  [actionTypes.FETCH_SELECTED_THEME]: (action, dispatch, state) => {
    const theme = themePreferenceRepository.getOrDefault();
    dispatch({
      type: actionTypes.RECEIVE_SELECTED_THEME,
      theme,
    });
  },

  [actionTypes.RECEIVE_SELECTED_THEME]: (action, dispatch, state) => {
    const selectedTheme = action.theme;
    document.documentElement.className = `Theme__${selectedTheme.id}`;
    themePreferenceRepository.save(selectedTheme);
  },
};
