import { Seq } from 'immutable';

import * as actionTypes from './actionTypes';

export default {
  [actionTypes.ACCESS_KEY_DOWN]: ({key}, dispatch, store) => {
    const {
      folderItemPreferences,
      bookmarkFolders,
      chromeAppFolders,
      chromePageFolders
    } = store.getState();
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
  },
};
