import { Record, Seq } from 'immutable';

export default class Link extends Record({
  url: null,
  app: false,
  icons: null,
}) {
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
