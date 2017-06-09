import { Record } from 'immutable';

export default class ChromePage extends Record({
  id: null,
  title: null,
  url: null,
}) {
  constructor(record) {
    super(record);
    this.icon = `chrome://favicon/${this.url}`;
  }

  merge(map) {
    return new ChromePage(super.merge(map));
  }

  open() {
    const { url } = this;
    window.chrome.tabs.create({url});
  }
}
