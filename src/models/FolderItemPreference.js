import { Record } from 'immutable';

export default class FolderItemPreference extends Record({
  id: null,
  accessKey: null,
}) {
  setAccessKey(accessKey) {
    if (accessKey.length === 1) {
      return new FolderItemPreference(this.set('accessKey', accessKey.toUpperCase()));
    } else {
      return new FolderItemPreference(this.set('accessKey', null));
    }
  }
}
