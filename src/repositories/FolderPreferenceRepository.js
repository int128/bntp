import FolderPreference from '../models/FolderPreference';

const COLLAPSED_FOLDERS = 'COLLAPSED_FOLDERS';

export default class FolderPreferenceRepository {
  get() {
    return FolderPreference.fromString(localStorage.getItem(COLLAPSED_FOLDERS));
  }

  save(folderPreference) {
    localStorage.setItem(COLLAPSED_FOLDERS, folderPreference.toString());
  }

  onChange(callback) {
    window.addEventListener('storage', e => {
      if (e.storageArea === localStorage && e.key === COLLAPSED_FOLDERS && e.newValue !== null) {
        callback(FolderPreference.fromString(e.newValue));
      }
    });
  }
}
