import FolderPreferences from '../../models/FolderPreferences';

import * as actionTypes from './actionTypes';

export function folderPreferences(state = new FolderPreferences(), action) {
  switch (action.type) {
    case actionTypes.RECEIVE_FOLDER_PREFERENCES:
      return action.folderPreferences;

    case actionTypes.TOGGLE_FOLDER:
      return state.toggle(action.folder);

    default:
      return state;
  }
}
