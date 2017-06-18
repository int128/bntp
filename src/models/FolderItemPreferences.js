import { Seq } from 'immutable';

import FolderItemPreference from './FolderItemPreference';

export default class FolderItemPreferences {
  /**
   * @param {Array<FolderItemPreference>} arrayOfFolderItemPreferences 
   */
  constructor(arrayOfFolderItemPreferences) {
    this.list = Seq(arrayOfFolderItemPreferences);
    this.mapById = this.list
      .groupBy(folderItemPreference => folderItemPreference.id)
      .map(list => list.first());
    this.mapByAccessKey = this.list
      .groupBy(folderItemPreference => folderItemPreference.accessKey)
      .map(list => list.first());
  }

  getById(id) {
    return this.mapById.get(id, new FolderItemPreference({id}));
  }

  findByAccessKey(accessKey) {
    return this.mapByAccessKey.get(accessKey);
  }

  set(folderItemPreference) {
    const altered = this.list
      .filter(e => e.id !== folderItemPreference.id)
      .filter(e => e.accessKey !== folderItemPreference.accessKey)
      .concat(Seq.of(folderItemPreference))
      .filter(e => e.accessKey !== FolderItemPreference.NO_ACCESS_KEY);
    return new FolderItemPreferences(altered);
  }

  toArray() {
    return this.list.toArray();
  }
}
