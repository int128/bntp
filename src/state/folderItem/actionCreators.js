import * as actionTypes from './actionTypes';

export function open(folderItem) {
  return {
    type: actionTypes.OPEN_FOLDER_ITEM,
    folderItem
  }
}

export function openByAccessKey(accessKey) {
  return {
    type: actionTypes.OPEN_FOLDER_ITEM_BY_ACCESS_KEY,
    accessKey
  }
}

export function fetchTopSites() {
  return {
    type: actionTypes.FETCH_TOP_SITES
  };
}
