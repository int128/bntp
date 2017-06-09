import { Record } from 'immutable';

export default class FolderItemPreference extends Record({
  id: null,
  accessKey: null,
}) {
  merge(map) {
    return new FolderItemPreference(super.merge({
      ...map,
      accessKey: (map.accessKey.length === 1) ? map.accessKey.toUpperCase() : null,
    }));
  }
}
