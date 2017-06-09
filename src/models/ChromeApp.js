import { Record, Seq } from 'immutable';

export default class ChromeApp extends Record({
  id: null,
  title: null,
  icons: Seq(),
}) {
  constructor(record) {
    super(record);
    this.url = this.id;
    this.icon = Seq(this.icons).maxBy(icon => icon.size).url;
  }

  merge(map) {
    return new ChromeApp(super.merge(map));
  }

  open() {
    window.chrome.management.launchApp(this.id);
  }
}
