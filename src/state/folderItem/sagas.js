import { fork, takeEvery, put, select } from 'redux-saga/effects';
import { pollCharacter } from '../../infrastructure/GlobalKeyHook';
import { openLink } from '../../infrastructure/LinkOpener';

import * as actionTypes from './actionTypes';

import BookmarkRepository from '../../repositories/BookmarkRepository';
import ChromeAppRepository from '../../repositories/ChromeAppRepository';
import TopSiteRepository from '../../repositories/TopSiteRepository';
import DemoDataRepository from '../../repositories/DemoDataRepository';
import FolderPreferenceRepository from '../../repositories/FolderPreferenceRepository';
import FolderItemPreferenceRepository from '../../repositories/FolderItemPreferenceRepository';

function* subscribeBookmarkFolders() {
  const bookmarkRepository = new BookmarkRepository();
  while (true) {
    const bookmarkFolders = yield bookmarkRepository.findAll();
    yield put({type: actionTypes.RECEIVE_BOOKMARKS, bookmarkFolders});
    yield bookmarkRepository.poll();
  }
}

function* subscribeChromeAppFolders() {
  const chromeAppRepository = new ChromeAppRepository();
  while (true) {
    const chromeAppFolders = yield chromeAppRepository.findFolders();
    yield put({type: actionTypes.RECEIVE_CHROME_APPS, chromeAppFolders});
    yield chromeAppRepository.poll();
  }
}

function* subscribeTopSites() {
  const topSiteRepository = new TopSiteRepository();
  const topSites = yield topSiteRepository.findAll();
  yield put({type: actionTypes.RECEIVE_TOP_SITES, topSites});
}

function* fetchDemoData() {
  const demoDataRepository = new DemoDataRepository();
  const { bookmarkFolders, topSites } = yield demoDataRepository.get();
  yield put({type: actionTypes.RECEIVE_BOOKMARKS, bookmarkFolders});
  yield put({type: actionTypes.RECEIVE_TOP_SITES, topSites});
}

function* subscribeFolderPreferences() {
  const folderPreferenceRepository = new FolderPreferenceRepository();
  while (true) {
    yield folderPreferenceRepository.poll();
    const folderPreferences = folderPreferenceRepository.get();
    yield put({type: actionTypes.RECEIVE_FOLDER_PREFERENCES, folderPreferences});
  }
}

function* subscribeFolderItemPreferences() {
  const folderItemPreferenceRepository = new FolderItemPreferenceRepository();
  while (true) {
    yield folderItemPreferenceRepository.poll();
    const folderItemPreferences = folderItemPreferenceRepository.get();
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
          openLink(folderItem);
        }
      }
    }
  }
}

function* saveFolderPreferences() {
  const folderPreferenceRepository = new FolderPreferenceRepository();
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
  folderPreferenceRepository.save(filtered);
}

function* saveFolderItemPreferences() {
  const folderItemPreferenceRepository = new FolderItemPreferenceRepository();
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
  folderItemPreferenceRepository.save(filtered);
}

function* toggleAllFolders({collapsed}) {
  const folderPreferenceRepository = new FolderPreferenceRepository();
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
  folderPreferenceRepository.save(toggled);
}

export default function* () {
  if (sessionStorage.getItem('demo') === null) {
    yield fork(subscribeBookmarkFolders);
    yield fork(subscribeChromeAppFolders);
    yield fork(subscribeTopSites);
  } else {
    yield fork(fetchDemoData);
  }

  yield fork(subscribeFolderPreferences);
  yield fork(subscribeFolderItemPreferences);
  yield fork(subscribeAccessKey);

  yield takeEvery(actionTypes.TOGGLE_FOLDER, saveFolderPreferences);
  yield takeEvery(actionTypes.TOGGLE_ALL_FOLDERS, toggleAllFolders);
  yield takeEvery(actionTypes.SAVE_FOLDER_ITEM_PREFERENCE, saveFolderItemPreferences);
}
