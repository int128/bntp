import { Seq } from 'immutable';

import FolderItemPreference from './FolderItemPreference';

export default class FolderItemPreferences {
  static fromJSON(json) {
    return new FolderItemPreferences(JSON.parse(json));
  }

  constructor(list) {
    this.list = Seq(list)
      .map(map => new FolderItemPreference(map))
      .valueSeq();  // avoid error even if map is given
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
    const filtered = this.list
      .filter(e => e.accessKey !== folderItemPreference.accessKey)
      .filter(e => e.accessKey !== FolderItemPreference.NO_ACCESS_KEY);
    if (folderItemPreference.accessKey !== FolderItemPreference.NO_ACCESS_KEY) {
      const appended = filtered.concat(Seq.of(folderItemPreference));
      return new FolderItemPreferences(appended);
    } else {
      return new FolderItemPreferences(filtered);
    }
  }

  toJSON() {
    return JSON.stringify(this.list.toJSON());
  }
}
