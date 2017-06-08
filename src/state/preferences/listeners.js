import * as repositories from '../../repositories';

import RootTheme from '../../components/RootTheme';

import * as actionTypes from './actionTypes';

export default {
  [actionTypes.TOGGLE_VISIBILITY]: (action, dispatch, store) => {
    repositories.visibilityRepository.save(store.getState().visibilities);
  },

  [actionTypes.RECEIVE_SELECTED_THEME]: (action, dispatch) => {
    RootTheme.render(action.theme);
  },

  [actionTypes.SELECT_THEME]: (action, dispatch) => {
    repositories.themePreferenceRepository.save(action.theme);
    RootTheme.render(action.theme);
  },
};
