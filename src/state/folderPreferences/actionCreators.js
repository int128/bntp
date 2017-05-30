import * as actionTypes from './actionTypes';

export function toggleFolderCollapse(folder) {
  return {
    type: actionTypes.TOGGLE_FOLDER_COLLAPSE,
    folder,
  };
}
