import { Seq } from 'immutable';

import FolderItemPreference from '../models/FolderItemPreference';
import FolderItemPreferences from '../models/FolderItemPreferences';

const FOLDER_ITEM_PREFERENCES = 'FOLDER_ITEM_PREFERENCES';

export default class FolderItemPreferenceRepository {
  get() {
    const json = JSON.parse(localStorage.getItem(FOLDER_ITEM_PREFERENCES));
    const array = Seq(json).map(object => new FolderItemPreference(object)).toArray();
    return new FolderItemPreferences(array);
  }

  save(folderItemPreferences) {
    localStorage.setItem(FOLDER_ITEM_PREFERENCES, JSON.stringify(folderItemPreferences.toArray()));
  }

  poll() {
    return new Promise(resolve => {
      const callback = e => {
        if (e.storageArea === localStorage && e.key === FOLDER_ITEM_PREFERENCES && e.newValue !== null) {
          window.removeEventListener('storage', callback);
          resolve();
        }
      }
      window.addEventListener('storage', callback);
    });
  }
}
