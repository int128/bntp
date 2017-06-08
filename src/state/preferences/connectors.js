import connectToEventListener from '../../infrastructure/connectToEventListener';

import * as repositories from '../../repositories';

import * as actionTypes from './actionTypes';

export const visibilities = connectToEventListener(repositories.visibilityRepository, () => ({
  type: actionTypes.RECEIVE_VISIBILITIES,
  visibilities: repositories.visibilityRepository.findAll(),
}));

export const themes = connectToEventListener(repositories.themePreferenceRepository, () => ({
  type: actionTypes.RECEIVE_SELECTED_THEME,
  theme: repositories.themePreferenceRepository.getOrDefault(),
}));
