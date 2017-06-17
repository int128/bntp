import { takeEvery, put } from 'redux-saga/effects';

import * as actionTypes from './actionTypes';

import * as actionCreators from '../folderItem/actionCreators';

import * as repositories from '../../repositories';

import Bookmark from '../../models/Bookmark';

function* save({folderItem, folderItemPreference}) {
  yield put(actionCreators.saveFolderItemPreference(folderItemPreference));
  if (folderItem instanceof Bookmark) {
    try {
      yield repositories.bookmarkRepository.update(folderItem);
      yield put({type: actionTypes.SAVE_SUCCEEDED_FOLDER_ITEM_EDITOR});
    } catch ({message}) {
      yield put({type: actionTypes.SAVE_FAILED_FOLDER_ITEM_EDITOR, message});
    }
  } else {
    yield put({type: actionTypes.SAVE_SUCCEEDED_FOLDER_ITEM_EDITOR});
  }
}

function* remove({folderItem}) {
  try {
    yield repositories.bookmarkRepository.remove(folderItem);
    yield put({type: actionTypes.REMOVE_SUCCEEDED_FOLDER_ITEM_EDITOR});
  } catch ({message}) {
    yield put({type: actionTypes.REMOVE_FAILED_FOLDER_ITEM_EDITOR, message});
  }
}

export default function* () {
  yield takeEvery(actionTypes.SAVE_FOLDER_ITEM_EDITOR, save);
  yield takeEvery(actionTypes.REMOVE_FOLDER_ITEM_EDITOR, remove);
}

