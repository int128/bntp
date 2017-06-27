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

  openIfSpecialLink() {
    const { url } = this;
    if (url.match(/^(chrome|file|javascript):/)) {
      window.chrome.tabs.create({url});
      return true;
    } else {
      return false;
    }
  }

  open() {
    const { url } = this;
    if (this.openIfSpecialLink() === false) {
      window.location.href = url;
    }
  }
}
