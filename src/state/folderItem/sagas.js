import { fork, takeEvery, put, select } from 'redux-saga/effects';
import { pollCharacter } from '../../infrastructure/GlobalKeyHook';

import * as actionTypes from './actionTypes';

import * as repositories from '../../repositories';

function* subscribeBookmarkFolders() {
  while (true) {
    const bookmarkFolders = yield repositories.bookmarkRepository.findAll();
    yield put({type: actionTypes.RECEIVE_BOOKMARKS, bookmarkFolders});
    yield repositories.bookmarkRepository.poll();
  }
}

function* subscribeChromeAppFolders() {
  while (true) {
    const chromeAppFolders = yield repositories.chromeAppRepository.findFolders();
    yield put({type: actionTypes.RECEIVE_CHROME_APPS, chromeAppFolders});
    yield repositories.chromeAppRepository.poll();
  }
}

function* subscribeTopSites() {
  const topSites = yield repositories.topSiteRepository.findAll();
  yield put({type: actionTypes.RECEIVE_TOP_SITES, topSites});
}

function* subscribeFolderPreferences() {
  while (true) {
    yield repositories.folderPreferenceRepository.poll();
    const folderPreferences = repositories.folderPreferenceRepository.get();
    yield put({type: actionTypes.RECEIVE_FOLDER_PREFERENCES, folderPreferences});
  }
}

function* subscribeFolderItemPreferences() {
  while (true) {
    yield repositories.folderItemPreferenceRepository.poll();
    const folderItemPreferences = repositories.folderItemPreferenceRepository.get();
    yield put({type: actionTypes.RECEIVE_FOLDER_ITEM_PREFERENCES, folderItemPreferences});
  }
}

function* subscribeAccessKey() {
  while (true) {
    const key = yield pollCharacter();
    const { showFolderItemEditor } = yield select();
    if (showFolderItemEditor === false) {
      const {
        folderItemPreferences,
        bookmarkFolders,
        chromeAppFolders,
        chromePageFolders
      } = yield select();
      const folderItemPreference = folderItemPreferences.findByAccessKey(key);
      if (folderItemPreference) {
        const folderItem = folderItemPreference.findFolderItemFrom(
          bookmarkFolders,
          chromeAppFolders,
          chromePageFolders,
        );
        if (folderItem) {
          folderItem.open();
        }
      }
    }
  }
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

function* toggleAllFolders({collapsed}) {
  const {
    folderPreferences,
    bookmarkFolders,
    chromeAppFolders,
    chromePageFolders,
  } = yield select();
  const toggled = folderPreferences.toggleAll(collapsed,
    bookmarkFolders,
    chromeAppFolders,
    chromePageFolders,
  );
  yield put({
    type: actionTypes.RECEIVE_FOLDER_PREFERENCES,
    folderPreferences: toggled,
  });
  repositories.folderPreferenceRepository.save(toggled);
}

export default function* () {
  yield fork(subscribeBookmarkFolders);
  yield fork(subscribeChromeAppFolders);
  yield fork(subscribeTopSites);
  yield fork(subscribeFolderPreferences);
  yield fork(subscribeFolderItemPreferences);
  yield fork(subscribeAccessKey);

  yield takeEvery(actionTypes.TOGGLE_FOLDER, saveFolderPreferences);
  yield takeEvery(actionTypes.TOGGLE_ALL_FOLDERS, toggleAllFolders);
  yield takeEvery(actionTypes.SAVE_FOLDER_ITEM_PREFERENCE, saveFolderItemPreferences);
}
