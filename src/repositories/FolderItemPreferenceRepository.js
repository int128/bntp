import FolderItemPreferences from '../models/FolderItemPreferences';

const FOLDER_ITEM_PREFERENCES = 'FOLDER_ITEM_PREFERENCES';

export default class FolderItemPreferenceRepository {
  get() {
    return FolderItemPreferences.fromJSON(localStorage.getItem(FOLDER_ITEM_PREFERENCES));
  }

  save(folderItemPreferences) {
    localStorage.setItem(FOLDER_ITEM_PREFERENCES, folderItemPreferences.toJSON());
  }

  addListener(callback) {
    const eventListener = e => {
      if (e.storageArea === localStorage && e.key === FOLDER_ITEM_PREFERENCES && e.newValue !== null) {
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
