import { takeEvery, select, put } from 'redux-saga/effects';

import * as actionTypes from './actionTypes';
import * as folderItemActionTypes from '../folderItem/actionTypes';

import * as repositories from '../../repositories';

import Bookmark from '../../models/Bookmark';

function* save({folderItem, folderItemPreference}) {
  const { folderItemPreferences } = yield select();
  const updated = folderItemPreferences.set(folderItemPreference);
  repositories.folderItemPreferenceRepository.save(updated);
  yield put({
    type: folderItemActionTypes.RECEIVE_FOLDER_ITEM_PREFERENCES,
    folderItemPreferences: updated
  });

  if (folderItem instanceof Bookmark) {
    yield repositories.bookmarkRepository.update(folderItem);
  }
  yield put({
    type: actionTypes.SAVED_FOLDER_ITEM_EDITOR,
    folderItem
  });
}

function* remove({folderItem}) {
  if (folderItem instanceof Bookmark) {
    yield repositories.bookmarkRepository.remove(folderItem);
  }
  yield put({
    type: actionTypes.REMOVED_FOLDER_ITEM_EDITOR,
    folderItem
  });
}

export default function* () {
  yield takeEvery(actionTypes.SAVE_FOLDER_ITEM_EDITOR, save);
  yield takeEvery(actionTypes.REMOVE_FOLDER_ITEM_EDITOR, remove);
}

