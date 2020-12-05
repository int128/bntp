import { Record } from 'immutable';

export default class Bookmark extends Record({
  id: null,
  title: null,
  url: null,
  icon: null,
}) {
  canEditTitle = true
  canEditUrl = true

  constructor(record) {
    super({
      ...record,
      icon: `chrome://favicon/${record.url}`,
    });
  }

  merge(map) {
    return new Bookmark(super.merge(map).toJS());
  }
}
