import connectToEventListener from '../../infrastructure/connectToEventListener';

import { folderPreferenceRepository } from '../../repositories';

import * as actionTypes from './actionTypes';

export default connectToEventListener(folderPreferenceRepository, () => ({
  type: actionTypes.RECEIVE_FOLDER_PREFERENCES,
  folderPreferences: folderPreferenceRepository.get()
}));
