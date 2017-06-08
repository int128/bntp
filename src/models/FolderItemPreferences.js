import { Seq } from 'immutable';

import FolderItemPreference from './FolderItemPreference';

export default class FolderItemPreferences {
  static fromJSON(json) {
    return new FolderItemPreferences(JSON.parse(json));
  }

  constructor(idMap) {
    this.idMap = Seq(idMap);
  }

  get(id) {
    return new FolderItemPreference(this.idMap.get(id, {id: id}));
  }

  findByAccessKey(accessKey) {
    return this.idMap
      .map(folderItemPreference => new FolderItemPreference(folderItemPreference))
      .find(folderItemPreference => folderItemPreference.accessKey === accessKey);
  }

  set(folderItemPreference) {
    return new FolderItemPreferences(this.idMap
      .filterNot(_ => _.accessKey === folderItemPreference.accessKey)
      .toMap()
      .set(folderItemPreference.id, folderItemPreference)
      .filterNot(_ => _.accessKey === null));
  }

  toJSON() {
    return JSON.stringify(this.idMap.toJSON());
  }
}
