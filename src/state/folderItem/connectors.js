import connectToEventListener from '../../infrastructure/connectToEventListener';

import * as repositories from '../../repositories';

import * as actionTypes from './actionTypes';

export const bookmarks = connectToEventListener(repositories.bookmarkRepository, () => ({
  type: actionTypes.FETCH_BOOKMARKS
}));

export const chromeApps = connectToEventListener(repositories.chromeAppRepository, () => ({
  type: actionTypes.FETCH_CHROME_APPS
}));

export const folderItemPreferences = connectToEventListener(repositories.folderItemPreferenceRepository, () => ({
  type: actionTypes.RECEIVE_FOLDER_ITEM_PREFERENCES,
  folderItemPreferences: repositories.folderItemPreferenceRepository.get()
}));
