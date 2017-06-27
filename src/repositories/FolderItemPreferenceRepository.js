import { Seq } from 'immutable';
import PreferenceStorage from '../infrastructure/PreferenceStorage';

import FolderItemPreference from '../models/FolderItemPreference';
import FolderItemPreferences from '../models/FolderItemPreferences';

export default class FolderItemPreferenceRepository {
  preferenceStorage = new PreferenceStorage('FOLDER_ITEM_PREFERENCES');

  get() {
    const json = this.preferenceStorage.get();
    const arrayOfFolderItemPreference = Seq(json)
      .map(object => new FolderItemPreference(object))
      .toArray();
    return new FolderItemPreferences(arrayOfFolderItemPreference);
  }

  save(folderItemPreferences) {
    this.preferenceStorage.save(folderItemPreferences.toArray());
  }

  poll() {
    return this.preferenceStorage.poll();
  }
}
