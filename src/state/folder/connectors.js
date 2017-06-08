import * as Connector from '../../infrastructure/Connector';

import * as repositories from '../../repositories';

import * as actionTypes from './actionTypes';

export const folderPreferences = Connector.lazy(repositories.folderPreferenceRepository, () => ({
  type: actionTypes.RECEIVE_FOLDER_PREFERENCES,
  folderPreferences: repositories.folderPreferenceRepository.get()
}));
