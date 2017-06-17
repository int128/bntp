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

  open() {
    const { url } = this;
    if (url.match(/^(chrome|file|javascript):/)) {
      window.chrome.tabs.create({url});
    } else {
      window.location.href = url;
    }
  }
}
