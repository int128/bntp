import { bookmarkRepository, folderItemPreferenceRepository } from '../../repositories';

import * as actionTypes from './actionTypes';
import * as folderItemActionTypes from '../folderItem/actionTypes';

import Bookmark from '../../models/Bookmark';

export default {
  [actionTypes.SAVE_FOLDER_ITEM_EDITOR]: ({folderItem, folderItemPreference}, dispatch, store) => {
    const folderItemPreferences = store.getState().folderItemPreferences.set(folderItemPreference);
    folderItemPreferenceRepository.save(folderItemPreferences);
    dispatch({
      type: folderItemActionTypes.RECEIVE_FOLDER_ITEM_PREFERENCES,
      folderItemPreferences
    });

    if (folderItem instanceof Bookmark) {
      bookmarkRepository.update(folderItem, () => dispatch({
        type: actionTypes.SAVED_FOLDER_ITEM_EDITOR,
        folderItem
      }));
    } else {
      dispatch({
        type: actionTypes.SAVED_FOLDER_ITEM_EDITOR,
        folderItem
      });
    }
  },

  [actionTypes.REMOVE_FOLDER_ITEM_EDITOR]: ({folderItem}, dispatch) => {
    if (folderItem instanceof Bookmark) {
      bookmarkRepository.remove(folderItem, () => dispatch({
        type: actionTypes.REMOVED_FOLDER_ITEM_EDITOR,
        folderItem
      }));
    } else {
      dispatch({
        type: actionTypes.REMOVED_FOLDER_ITEM_EDITOR,
        folderItem
      });
    }
  },
};
