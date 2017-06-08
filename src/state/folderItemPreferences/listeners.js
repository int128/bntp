import { Seq } from 'immutable';

import * as actionTypes from './actionTypes';

export default {
  [actionTypes.ACCESS_KEY_DOWN]: ({key}, dispatch, store) => {
    const { folderItemPreferences } = store.getState();
    const folderItemPreference = folderItemPreferences.findByAccessKey(key);
    if (folderItemPreference) {
      const { bookmarkFolders, chromeAppFolders, chromePageFolders } = store.getState();
      const folderItem = Seq.of(bookmarkFolders, chromeAppFolders, chromePageFolders)
        .flatMap(folders => folders)
        .flatMap(folder => folder.items)
        .find(folderItem => folderItem.id === folderItemPreference.id);
      if (folderItem) {
        dispatch({
          type: actionTypes.OPEN_FOLDER_ITEM,
          folderItem
        });
      }
    }
  },

  [actionTypes.OPEN_FOLDER_ITEM]: ({folderItem}) => {
    const { link } = folderItem;
    if (link.isSpecial()) {
      window.chrome.tabs.create({url: link.url});
    } else if (link.isApp()) {
      window.chrome.management.launchApp(link.url);
    } else {
      window.location.href = link.url;
    }
  },
}
