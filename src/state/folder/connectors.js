import connectToEventListener from '../../infrastructure/connectToEventListener';

import * as repositories from '../../repositories';

import * as actionTypes from './actionTypes';

export const folderPreferences = connectToEventListener(repositories.folderPreferenceRepository, () => ({
  type: actionTypes.RECEIVE_FOLDER_PREFERENCES,
  folderPreferences: repositories.folderPreferenceRepository.get()
}));
