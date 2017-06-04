import FolderPreferences from '../models/FolderPreferences';

const COLLAPSED_FOLDERS = 'COLLAPSED_FOLDERS';

export default class FolderPreferenceRepository {
  get() {
    return FolderPreferences.fromJSON(localStorage.getItem(COLLAPSED_FOLDERS));
  }

  save(folderPreferences) {
    localStorage.setItem(COLLAPSED_FOLDERS, folderPreferences.toJSON());
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
