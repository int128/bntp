import { themePreferenceRepository } from '../../repositories';

import EventBrokers from '../../infrastructure/EventBrokers';
import RootTheme from '../../components/RootTheme';

import * as actionTypes from './actionTypes';

const eventBrokers = new EventBrokers({themePreferenceRepository});

export default {
  [actionTypes.SUBSCRIBE_SELECTED_THEME]: (action, dispatch) => {
    eventBrokers.themePreferenceRepository.subscribe(() => dispatch({
      type: actionTypes.RECEIVE_SELECTED_THEME,
      theme: themePreferenceRepository.getOrDefault(),
    }));
  },

  [actionTypes.UNSUBSCRIBE_SELECTED_THEME]: (action, dispatch) => {
    eventBrokers.themePreferenceRepository.unsubscribe();
  },

  [actionTypes.RECEIVE_SELECTED_THEME]: (action, dispatch) => {
    RootTheme.render(action.theme);
  },

  [actionTypes.SELECT_THEME]: (action, dispatch) => {
    themePreferenceRepository.save(action.theme);
    RootTheme.render(action.theme);
  },
};
