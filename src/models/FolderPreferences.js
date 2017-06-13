import { Seq } from 'immutable';

export default class FolderPreferences {
  static fromJSON(json) {
    return new FolderPreferences(JSON.parse(json));
  }

  constructor(collapsedFolderIds) {
    this.collapsedFolderIds = Seq(collapsedFolderIds);
  }

  isCollapsed(folder) {
    return this.collapsedFolderIds.contains(folder.id);
  }

  toggle(folder) {
    if (this.isCollapsed(folder)) {
      return new FolderPreferences(this.collapsedFolderIds.filterNot(id => id === folder.id));
    } else {
      return new FolderPreferences(this.collapsedFolderIds.valueSeq().concat(folder.id));
    }
  }

  toJSON() {
    return JSON.stringify(this.collapsedFolderIds.toJSON());
  }
}
