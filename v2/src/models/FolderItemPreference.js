import { Record, Seq } from 'immutable';

const NO_ACCESS_KEY = '';

export default class FolderItemPreference extends Record({
  id: null,
  accessKey: NO_ACCESS_KEY,
}) {
  static NO_ACCESS_KEY = NO_ACCESS_KEY

  merge(map) {
    return new FolderItemPreference(super.merge({
      ...map,
      accessKey: (map.accessKey.length === 1) ? map.accessKey.toUpperCase() : NO_ACCESS_KEY,
    }));
  }

  findFolderItemFrom(...folders) {
    return Seq(folders)
      .flatMap(folders => folders)
      .flatMap(folder => folder.items)
      .find(folderItem => folderItem.id === this.id);
  }
}
