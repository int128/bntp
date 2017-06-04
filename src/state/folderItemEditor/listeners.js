import { bookmarkRepository, folderItemPreferenceRepository } from '../../repositories';

import * as actionTypes from './actionTypes';
import * as folderItemPreferencesActionTypes from '../folderItemPreferences/actionTypes';

export default {
  [actionTypes.SAVE_FOLDER_ITEM_EDITOR]: (action, dispatch, store) => {
    const { folderItem, folderItemPreference } = action;

    const folderItemPreferences = store.getState().folderItemPreferences.set(folderItemPreference);
    folderItemPreferenceRepository.save(folderItemPreferences);
    dispatch({
      type: folderItemPreferencesActionTypes.RECEIVE_FOLDER_ITEM_PREFERENCES,
      folderItemPreferences
    });

    bookmarkRepository.update(folderItem, () => dispatch({
      type: actionTypes.SAVED_FOLDER_ITEM_EDITOR,
      folderItem
    }));
  },

  [actionTypes.REMOVE_FOLDER_ITEM_EDITOR]: (action, dispatch) => {
    const { folderItem } = action;
    bookmarkRepository.remove(folderItem, () => dispatch({
      type: actionTypes.REMOVED_FOLDER_ITEM_EDITOR,
      folderItem
    }))
  },
};
