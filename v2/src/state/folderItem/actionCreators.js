import * as actionTypes from './actionTypes';

export function toggleFolder(folder) {
  return {
    type: actionTypes.TOGGLE_FOLDER,
    folder
  };
}

export function expandAllFolders() {
  return {
    type: actionTypes.TOGGLE_ALL_FOLDERS,
    collapsed: false
  };
}

export function collapseAllFolders() {
  return {
    type: actionTypes.TOGGLE_ALL_FOLDERS,
    collapsed: true
  };
}

export function saveFolderItemPreference(folderItemPreference) {
  return {
    type: actionTypes.SAVE_FOLDER_ITEM_PREFERENCE,
    folderItemPreference
  };
}
