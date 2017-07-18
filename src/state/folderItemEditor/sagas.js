import { takeEvery, put } from 'redux-saga/effects';

import * as actionTypes from './actionTypes';

import * as actionCreators from '../folderItem/actionCreators';

import BookmarkRepository from '../../repositories/BookmarkRepository';

import Bookmark from '../../models/Bookmark';

function* save({folderItem, folderItemPreference}) {
  const bookmarkRepository = new BookmarkRepository();
  yield put(actionCreators.saveFolderItemPreference(folderItemPreference));
  if (folderItem instanceof Bookmark) {
    try {
      yield bookmarkRepository.update(folderItem);
      yield put({type: actionTypes.SAVE_SUCCEEDED_FOLDER_ITEM_EDITOR});
    } catch ({message}) {
      yield put({type: actionTypes.SAVE_FAILED_FOLDER_ITEM_EDITOR, message});
    }
  } else {
    yield put({type: actionTypes.SAVE_SUCCEEDED_FOLDER_ITEM_EDITOR});
  }
}

function* remove({folderItem}) {
  const bookmarkRepository = new BookmarkRepository();
  try {
    yield bookmarkRepository.remove(folderItem);
    yield put({type: actionTypes.REMOVE_SUCCEEDED_FOLDER_ITEM_EDITOR});
  } catch ({message}) {
    yield put({type: actionTypes.REMOVE_FAILED_FOLDER_ITEM_EDITOR, message});
  }
}

export default function* () {
  yield takeEvery(actionTypes.SAVE_FOLDER_ITEM_EDITOR, save);
  yield takeEvery(actionTypes.REMOVE_FOLDER_ITEM_EDITOR, remove);
}

