import * as actionTypes from './actionTypes';

import FolderPreference from '../../models/preferences/FolderPreference';

export function folderPreference(state = new FolderPreference(), action) {
  switch (action.type) {
    case actionTypes.TOGGLE_FOLDER_COLLAPSE:
      return state.toggle(action.folder);
    case actionTypes.RECEIVE_FOLDER_PREFERENCE:
      return action.folderPreference;
    default:
      return state;
  }
}
