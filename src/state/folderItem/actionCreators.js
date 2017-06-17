import * as actionTypes from './actionTypes';

export function fetchTopSites() {
  return {
    type: actionTypes.FETCH_TOP_SITES
  };
}

export function toggleFolder(folder) {
  return {
    type: actionTypes.TOGGLE_FOLDER,
    folder
  };
}

export function saveFolderItemPreference(folderItemPreference) {
  return {
    type: actionTypes.SAVE_FOLDER_ITEM_PREFERENCE,
    folderItemPreference
  };
}
