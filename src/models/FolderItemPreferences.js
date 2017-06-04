import { Map } from 'immutable';

import FolderItemPreference from './FolderItemPreference';

export default class FolderItemPreferences {
  static fromJSON(json) {
    return new FolderItemPreferences(JSON.parse(json));
  }

  constructor(idMap) {
    this.idMap = Map(idMap);
  }

  get(id) {
    return new FolderItemPreference(this.idMap.get(id, {id: id}));
  }

  set(folderItemPreference) {
    return new FolderItemPreferences(this.idMap.set(folderItemPreference.id, folderItemPreference));
  }

  toJSON() {
    return JSON.stringify(this.idMap.toJSON());
  }
}
