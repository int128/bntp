import FolderPreference from '../models/FolderPreference';

const COLLAPSED_FOLDERS = 'COLLAPSED_FOLDERS';

export default class FolderPreferenceRepository {
  get() {
    return FolderPreference.fromString(localStorage.getItem(COLLAPSED_FOLDERS));
  }

  save(folderPreference) {
    localStorage.setItem(COLLAPSED_FOLDERS, folderPreference.toString());
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
