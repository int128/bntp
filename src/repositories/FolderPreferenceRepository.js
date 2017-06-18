import { Seq } from 'immutable';

import FolderPreference from '../models/FolderPreference';
import FolderPreferences from '../models/FolderPreferences';

const FOLDER_PREFERENCES = 'FOLDER_PREFERENCES';
const COLLAPSED_FOLDERS = 'COLLAPSED_FOLDERS';

export default class FolderPreferenceRepository {
  get() {
    // migrate old data
    if (localStorage.getItem(COLLAPSED_FOLDERS)) {
      const json = JSON.parse(localStorage.getItem(COLLAPSED_FOLDERS));
      const array = Seq(json).map(id => new FolderPreference({id, collapsed: true})).toArray();
      return new FolderPreferences(array);
    }

    const json = JSON.parse(localStorage.getItem(FOLDER_PREFERENCES));
    const array = Seq(json).map(object => new FolderPreference(object)).toArray();
    return new FolderPreferences(array);
  }

  save(folderPreferences) {
    localStorage.setItem(FOLDER_PREFERENCES, JSON.stringify(folderPreferences.toArray()));
    localStorage.removeItem(COLLAPSED_FOLDERS);
  }

  addListener(callback) {
    const eventListener = e => {
      if (e.storageArea === localStorage && e.key === COLLAPSED_FOLDERS && e.newValue !== null) {
        callback();
      }
    };
    window.addEventListener('storage', eventListener);
    return eventListener;
  }

  removeListener(eventListener) {
    window.removeEventListener('storage', eventListener);
  }
}
