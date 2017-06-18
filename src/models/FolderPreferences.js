import { Seq } from 'immutable';

import FolderPreference from './FolderPreference';

export default class FolderPreferences {
  /**
   * @param {Array<FolderPreference>} arrayOfFolderPreference 
   */
  constructor(arrayOfFolderPreference) {
    this.list = Seq(arrayOfFolderPreference);
    this.mapById = this.list
      .groupBy(folderPreference => folderPreference.id)
      .map(list => list.first());
  }

  getById(id) {
    return this.mapById.get(id, new FolderPreference({id}));
  }

  filterExistentFoldersIn(...folders) {
    const existentFolderIdSeq = Seq(folders)
      .flatMap(folders => folders)
      .map(folder => folder.id);
    return this.list.filter(folderPreference => existentFolderIdSeq.contains(folderPreference.id));
  }

  set(folderPreference) {
    const altered = this.list
      .filter(e => e.id !== folderPreference.id)
      .concat(Seq.of(folderPreference))
      .filter(e => e.collapsed === true);
    return new FolderPreferences(altered);
  }

  toggle(folder) {
    return this.set(this.getById(folder.id).toggle());
  }

  toArray() {
    return this.list.toArray();
  }
}
