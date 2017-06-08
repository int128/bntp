import connectToEventListener from '../../infrastructure/connectToEventListener';

import { themePreferenceRepository } from '../../repositories';

import * as actionTypes from './actionTypes';

export default connectToEventListener(themePreferenceRepository, () => ({
  type: actionTypes.RECEIVE_SELECTED_THEME,
  theme: themePreferenceRepository.getOrDefault(),
}));
