import FolderItemPreferences from '../../models/FolderItemPreferences';

import * as actionTypes from './actionTypes';

export function folderItemPreferences(state = new FolderItemPreferences(), action) {
  switch (action.type) {
    case actionTypes.RECEIVE_FOLDER_ITEM_PREFERENCES:
      return action.folderItemPreferences;

    default:
      return state;
  }
}
