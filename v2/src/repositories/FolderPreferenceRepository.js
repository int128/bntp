import { Seq } from 'immutable';
import PreferenceStorage from '../infrastructure/PreferenceStorage';

import FolderPreference from '../models/FolderPreference';
import FolderPreferences from '../models/FolderPreferences';

export default class FolderPreferenceRepository {
  preferenceStorage = new PreferenceStorage('FOLDER_PREFERENCES')
  oldCollapsedFoldersStorage = new PreferenceStorage('COLLAPSED_FOLDERS')

  get() {
    // migrate old data
    const collapsedFolders = this.oldCollapsedFoldersStorage.get();
    if (collapsedFolders !== null) {
      const arrayOfFolderPreferences = Seq(collapsedFolders)
        .map(id => new FolderPreference({id, collapsed: true}))
        .toArray();
      return new FolderPreferences(arrayOfFolderPreferences);
    }

    const json = this.preferenceStorage.get();
    const arrayOfFolderPreferences = Seq(json)
      .map(object => new FolderPreference(object))
      .toArray();
    return new FolderPreferences(arrayOfFolderPreferences);
  }

  save(folderPreferences) {
    this.preferenceStorage.save(folderPreferences.toArray());

    // remove old data
    this.oldCollapsedFoldersStorage.remove();
  }

  poll() {
    return this.preferenceStorage.poll();
  }
}
