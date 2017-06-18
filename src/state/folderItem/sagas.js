import { Seq } from 'immutable';
import { takeEvery, put, select } from 'redux-saga/effects';

import * as actionTypes from './actionTypes';
import * as keyHookActionTypes from '../keyHook/actionTypes';

import * as repositories from '../../repositories';

function* fetchBookmarkFolders() {
  const bookmarkFolders = yield repositories.bookmarkRepository.findAll();
  yield put({type: actionTypes.RECEIVE_BOOKMARKS, bookmarkFolders});
}

function* fetchChromeAppFolders() {
  const chromeAppFolders = yield repositories.chromeAppRepository.findFolders();
  yield put({type: actionTypes.RECEIVE_CHROME_APPS, chromeAppFolders});
}

function* fetchTopSites() {
  const topSites = yield repositories.topSiteRepository.findAll();
  yield put({type: actionTypes.RECEIVE_TOP_SITES, topSites});
}

function* saveFolderPreferences() {
  const {
    folderPreferences,
    bookmarkFolders,
    chromeAppFolders,
    chromePageFolders,
  } = yield select();
  const filtered = folderPreferences.filterExistentFoldersIn(
    bookmarkFolders,
    chromeAppFolders,
    chromePageFolders,
  );
  repositories.folderPreferenceRepository.save(filtered);
}

function* saveFolderItemPreferences() {
  const {
    folderItemPreferences,
    bookmarkFolders,
    chromeAppFolders,
    chromePageFolders,
  } = yield select();
  const filtered = folderItemPreferences.filterExistentFolderItemsIn(
    bookmarkFolders,
    chromeAppFolders,
    chromePageFolders,
  );
  repositories.folderItemPreferenceRepository.save(filtered);
}

function* handleAccessKey({key}) {
  const { showFolderItemEditor } = yield select();
  if (showFolderItemEditor === false) {
    yield openFolderItemByAccessKey({key});
  }
}

function* openFolderItemByAccessKey({key}) {
  const {
    folderItemPreferences,
    bookmarkFolders,
    chromeAppFolders,
    chromePageFolders
  } = yield select();
  const folderItemPreference = folderItemPreferences.findByAccessKey(key);
  if (folderItemPreference) {
    const folderItemId = folderItemPreference.id;
    const folderItem = Seq.of(bookmarkFolders, chromeAppFolders, chromePageFolders)
      .flatMap(folders => folders)
      .flatMap(folder => folder.items)
      .find(folderItem => folderItem.id === folderItemId);
    if (folderItem) {
      folderItem.open();
    }
  }
}

export default function* () {
  yield takeEvery(actionTypes.FETCH_BOOKMARKS, fetchBookmarkFolders);
  yield takeEvery(actionTypes.FETCH_CHROME_APPS, fetchChromeAppFolders);
  yield takeEvery(actionTypes.FETCH_TOP_SITES, fetchTopSites);

  yield takeEvery(actionTypes.TOGGLE_FOLDER, saveFolderPreferences);
  yield takeEvery(actionTypes.SAVE_FOLDER_ITEM_PREFERENCE, saveFolderItemPreferences);

  yield takeEvery(keyHookActionTypes.RECEIVE_CHARACTER_KEY, handleAccessKey);
}
