import * as Connector from '../../infrastructure/Connector';

import * as repositories from '../../repositories';

import * as actionTypes from './actionTypes';

export const bookmarks = Connector.eager(repositories.bookmarkRepository, () => ({
  type: actionTypes.FETCH_BOOKMARKS
}));

export const chromeApps = Connector.eager(repositories.chromeAppRepository, () => ({
  type: actionTypes.FETCH_CHROME_APPS
}));

export const folderPreferences = Connector.lazy(repositories.folderPreferenceRepository, () => ({
  type: actionTypes.RECEIVE_FOLDER_PREFERENCES,
  folderPreferences: repositories.folderPreferenceRepository.get()
}));

export const folderItemPreferences = Connector.lazy(repositories.folderItemPreferenceRepository, () => ({
  type: actionTypes.RECEIVE_FOLDER_ITEM_PREFERENCES,
  folderItemPreferences: repositories.folderItemPreferenceRepository.get()
}));
