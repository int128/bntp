import { Record, Seq } from 'immutable';

export default class ChromeApp extends Record({
  id: null,
  title: null,
  icons: Seq(),
  url: null,
  icon: null,
}) {
  constructor(map) {
    super({
      ...map,
      url: map.id,
      icon: Seq(map.icons).maxBy(icon => icon.size).url,
    });
  }

  merge(map) {
    return new ChromeApp(super.merge(map).toJS());
  }

  open() {
    window.chrome.management.launchApp(this.id);
  }
}
