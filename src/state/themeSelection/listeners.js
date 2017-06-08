import { themePreferenceRepository } from '../../repositories';

import RootTheme from '../../components/RootTheme';

import * as actionTypes from './actionTypes';

export default {
  [actionTypes.RECEIVE_SELECTED_THEME]: (action, dispatch) => {
    RootTheme.render(action.theme);
  },

  [actionTypes.SELECT_THEME]: (action, dispatch) => {
    themePreferenceRepository.save(action.theme);
    RootTheme.render(action.theme);
  },
};
