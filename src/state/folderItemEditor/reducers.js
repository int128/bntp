import * as actionTypes from './actionTypes';

export function showFolderItemEditor(state = false, action) {
  switch (action.type) {
    case actionTypes.OPEN_FOLDER_ITEM_EDITOR:
      return true;

    case actionTypes.SAVED_FOLDER_ITEM_EDITOR:
    case actionTypes.REMOVED_FOLDER_ITEM_EDITOR:
    case actionTypes.CANCEL_FOLDER_ITEM_EDITOR:
      return false;

    default:
      return state;
  }
}

export function editingFolderItem(state = null, action) {
  switch (action.type) {
    case actionTypes.OPEN_FOLDER_ITEM_EDITOR:
    case actionTypes.CHANGE_FOLDER_ITEM_EDITOR:
      return action.folderItem;

    case actionTypes.SAVED_FOLDER_ITEM_EDITOR:
    case actionTypes.REMOVED_FOLDER_ITEM_EDITOR:
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

    case actionTypes.SAVED_FOLDER_ITEM_EDITOR:
    case actionTypes.REMOVED_FOLDER_ITEM_EDITOR:
    case actionTypes.CANCEL_FOLDER_ITEM_EDITOR:
      return null;

    default:
      return state;
  }
}
