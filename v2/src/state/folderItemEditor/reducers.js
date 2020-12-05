import * as actionTypes from './actionTypes';

export function showFolderItemEditor(state = false, action) {
  switch (action.type) {
    case actionTypes.OPEN_FOLDER_ITEM_EDITOR:
      return true;

    case actionTypes.SAVE_SUCCEEDED_FOLDER_ITEM_EDITOR:
    case actionTypes.REMOVE_SUCCEEDED_FOLDER_ITEM_EDITOR:
    case actionTypes.CANCEL_FOLDER_ITEM_EDITOR:
      return false;

    default:
      return state;
  }
}

export function folderItemEditorError(state = null, action) {
  switch (action.type) {
    case actionTypes.SAVE_FAILED_FOLDER_ITEM_EDITOR:
    case actionTypes.REMOVE_FAILED_FOLDER_ITEM_EDITOR:
      return action.message;

    default:
      return null;
  }
}

export function editingFolderItem(state = null, action) {
  switch (action.type) {
    case actionTypes.OPEN_FOLDER_ITEM_EDITOR:
    case actionTypes.CHANGE_FOLDER_ITEM_EDITOR:
      return action.folderItem;

    case actionTypes.SAVE_SUCCEEDED_FOLDER_ITEM_EDITOR:
    case actionTypes.REMOVE_SUCCEEDED_FOLDER_ITEM_EDITOR:
    case actionTypes.CANCEL_FOLDER_ITEM_EDITOR:
      return null;

    default:
      return state;
  }
}

export function editingFolderItemPreference(state = null, action) {
  switch (action.type) {
    case actionTypes.OPEN_FOLDER_ITEM_EDITOR:
    case actionTypes.CHANGE_FOLDER_ITEM_EDITOR:
      return action.folderItemPreference;

    case actionTypes.SAVE_SUCCEEDED_FOLDER_ITEM_EDITOR:
    case actionTypes.REMOVE_SUCCEEDED_FOLDER_ITEM_EDITOR:
    case actionTypes.CANCEL_FOLDER_ITEM_EDITOR:
      return null;

    default:
      return state;
  }
}
