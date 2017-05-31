import { Map } from 'immutable';

export default class BookmarkPreference {
  static fromJSON(json) {
    return new BookmarkPreference(JSON.parse(json));
  }

  constructor(accessKeyMap) {
    this.accessKeyMap = Map(accessKeyMap);
  }

  getAccessKey(bookmark) {
    return this.accessKeyMap.get(bookmark.id);
  }

  setAccessKey(bookmark, accessKey) {
    return new BookmarkPreference(this.accessKeyMap.set(bookmark.id, accessKey));
  }

  toJSON() {
    return JSON.stringify(this.accessKeyMap.toJSON());
  }
}
