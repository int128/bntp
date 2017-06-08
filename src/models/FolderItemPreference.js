import { Record } from 'immutable';

export default class FolderItemPreference extends Record({
  id: null,
  accessKey: null,
}) {
  setAccessKey(accessKey) {
    const canonical = accessKey.substring(0, 1).toUpperCase();
    return new FolderItemPreference(this.set('accessKey', canonical));
  }
}
