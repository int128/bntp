import * as actionTypes from './actionTypes';

export function open(folderItem) {
  return {
    type: actionTypes.OPEN_FOLDER_ITEM,
    folderItem
  }
}
