import connectToEventListener from '../../infrastructure/connectToEventListener';

import { folderItemPreferenceRepository } from '../../repositories';

import * as actionTypes from './actionTypes';

export default connectToEventListener(folderItemPreferenceRepository, () => ({
  type: actionTypes.RECEIVE_FOLDER_ITEM_PREFERENCES,
  folderItemPreferences: folderItemPreferenceRepository.get()
}));
