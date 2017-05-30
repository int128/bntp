import * as actionTypes from './actionTypes';

export function subscribeFolderPreferences() {
  return {
    type: actionTypes.SUBSCRIBE_FOLDER_PREFERENCE,
  }
}

export function unsubscribeFolderPreferences() {
  return {
    type: actionTypes.UNSUBSCRIBE_FOLDER_PREFERENCE,
  }
}

export function toggleFolderCollapse(folder) {
  return {
    type: actionTypes.TOGGLE_FOLDER_COLLAPSE,
    folder,
  };
}
