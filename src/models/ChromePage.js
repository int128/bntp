import { Record } from 'immutable';

export default class ChromePage extends Record({
  id: null,
  title: null,
  url: null,
}) {
  setTitle = () => this
  setUrl = () => this

  constructor(record) {
    super(record);
    this.icon = `chrome://favicon/${this.url}`;
  }

  open() {
    const { url } = this;
    window.chrome.tabs.create({url});
  }
}
