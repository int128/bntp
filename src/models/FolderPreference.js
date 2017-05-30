import { Map } from 'immutable';

export default class FolderPreference {
  static fromString(json) {
    return new FolderPreference(JSON.parse(json));
  }

  constructor(folderIdMap) {
    this.folderIdMap = Map(folderIdMap);
  }

  isCollapse(folder) {
    return this.folderIdMap.get(folder.id) === true;
  }

  toggle(folder) {
    if (this.isCollapse(folder)) {
      return new FolderPreference(this.folderIdMap.remove(folder.id));
    } else {
      return new FolderPreference(this.folderIdMap.set(folder.id, true));
    }
  }

  toString() {
    return JSON.stringify(this.folderIdMap.toJSON());
  }
}
