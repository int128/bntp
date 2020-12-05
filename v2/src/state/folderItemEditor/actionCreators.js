import * as actionTypes from './actionTypes';

export function open(folderItem, folderItemPreference) {
  return {
    type: actionTypes.OPEN_FOLDER_ITEM_EDITOR,
    folderItem,
    folderItemPreference,
  };
}

export function notifyChange(folderItem, folderItemPreference) {
  return {
    type: actionTypes.CHANGE_FOLDER_ITEM_EDITOR,
    folderItem,
    folderItemPreference,
  };
}

export function save(folderItem, folderItemPreference) {
  return {
    type: actionTypes.SAVE_FOLDER_ITEM_EDITOR,
    folderItem,
    folderItemPreference,
  };
}

export function remove(folderItem, folderItemPreference) {
  return {
    type: actionTypes.REMOVE_FOLDER_ITEM_EDITOR,
    folderItem,
    folderItemPreference,
  };
}

export function cancel() {
  return {
    type: actionTypes.CANCEL_FOLDER_ITEM_EDITOR,
  };
}
