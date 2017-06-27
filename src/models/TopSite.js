import { Record } from 'immutable';

export default class TopSite extends Record({
  url: null,
  title: null,
  icon: null,
}) {
  constructor(record) {
    super({
      ...record,
      icon: `chrome://favicon/${record.url}`,
    });
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
