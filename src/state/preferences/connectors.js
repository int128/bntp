import * as Connector from '../../infrastructure/Connector';

import * as repositories from '../../repositories';

import * as actionTypes from './actionTypes';

export const visibilities = Connector.lazy(repositories.visibilityRepository, () => ({
  type: actionTypes.RECEIVE_VISIBILITIES,
  visibilities: repositories.visibilityRepository.findAll(),
}));

export const selectedTheme = Connector.lazy(repositories.themePreferenceRepository, () => ({
  type: actionTypes.RECEIVE_SELECTED_THEME,
  theme: repositories.themePreferenceRepository.getOrDefault(),
}));
