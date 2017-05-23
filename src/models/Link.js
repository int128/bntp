import { Record, Seq } from 'immutable';

const LinkRecord = Record({
  url: null,
  app: false,
  icons: null,
});

export default class Link extends LinkRecord {
  isSpecial = () => this.url.match(/^(chrome|file|javascript):/)

  isApp = () => this.app

  getIcon() {
    const icon = Seq(this.icons).maxBy(icon => icon.size);
    if (icon) {
      return icon.url;
    } else {
      return `chrome://favicon/${this.url}`;
    }
  }
}
