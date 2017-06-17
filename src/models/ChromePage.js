import { Record } from 'immutable';

export default class ChromePage extends Record({
  id: null,
  title: null,
  url: null,
  icon: null,
}) {
  constructor(record) {
    super({
      ...record,
      icon: `chrome://favicon/${record.url}`,
    });
  }

  merge(map) {
    return new ChromePage(super.merge(map).toJS());
  }

  open() {
    const { url } = this;
    window.chrome.tabs.create({url});
  }
}
