import { themePreferenceRepository } from '../../repositories';

import EventListenerManager from '../../infrastructure/EventListenerManager';
import RootTheme from '../../components/RootTheme';

import * as actionTypes from './actionTypes';

const eventListenerManager = new EventListenerManager(themePreferenceRepository);

export default {
  [actionTypes.SUBSCRIBE_SELECTED_THEME]: (action, dispatch) => {
    eventListenerManager.subscribe(() => dispatch({
      type: actionTypes.RECEIVE_SELECTED_THEME,
      theme: themePreferenceRepository.getOrDefault(),
    }));
  },

  [actionTypes.UNSUBSCRIBE_SELECTED_THEME]: (action, dispatch) => {
    eventListenerManager.unsubscribe();
  },

  [actionTypes.RECEIVE_SELECTED_THEME]: (action, dispatch) => {
    RootTheme.render(action.theme);
  },

  [actionTypes.SELECT_THEME]: (action, dispatch) => {
    themePreferenceRepository.save(action.theme);
    RootTheme.render(action.theme);
  },
};
