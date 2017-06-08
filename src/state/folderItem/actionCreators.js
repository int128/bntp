import * as actionTypes from './actionTypes';

export function open(folderItem) {
  return {
    type: actionTypes.OPEN_FOLDER_ITEM,
    folderItem
  }
}

export function fetchTopSites() {
  return {
    type: actionTypes.FETCH_TOP_SITES
  };
}
