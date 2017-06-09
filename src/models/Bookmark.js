import { Record } from 'immutable';

export default class Bookmark extends Record({
  id: null,
  title: null,
  url: null,
}) {
  canEditTitle = true
  canEditUrl = true

  constructor(record) {
    super(record);
    this.icon = `chrome://favicon/${this.url}`;
  }

  merge(map) {
    return new Bookmark(super.merge(map));
  }

  open() {
    const { url } = this;
    if (url.match(/^(chrome|file|javascript):/)) {
      window.chrome.tabs.create({url});
    } else {
      window.location.href = url;
    }
  }
}
