import { Seq } from 'immutable';

import * as repositories from '../../repositories';

import * as actionTypes from './actionTypes';

export default {
  [actionTypes.FETCH_BOOKMARKS]: (action, dispatch) => {
    repositories.bookmarkRepository.findAll(bookmarkFolders => dispatch({
      type: actionTypes.RECEIVE_BOOKMARKS,
      bookmarkFolders
    }));
  },

  [actionTypes.FETCH_CHROME_APPS]: (action, dispatch) => {
    repositories.chromeAppRepository.findFolders(chromeAppFolders => dispatch({
      type: actionTypes.RECEIVE_CHROME_APPS,
      chromeAppFolders
    }))
  },

  [actionTypes.FETCH_TOP_SITES]: (action, dispatch) => {
    repositories.topSiteRepository.findAll(topSites => dispatch({
      type: actionTypes.RECEIVE_TOP_SITES,
      topSites,
    }));
  },

  [actionTypes.OPEN_FOLDER_ITEM_BY_ACCESS_KEY]: ({accessKey}, dispatch, store) => {
    const {
      folderItemPreferences,
      bookmarkFolders,
      chromeAppFolders,
      chromePageFolders
    } = store.getState();
    const folderItemPreference = folderItemPreferences.findByAccessKey(accessKey);
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
  },
};
