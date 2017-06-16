import { Seq } from 'immutable';
import ChromePromise from 'chrome-promise';

import TopSite from '../models/TopSite';

export default class TopSiteRepository {
  chrome = new ChromePromise();

  *findAll() {
    return Seq(yield this.chrome.topSites.get()).map(topSite => new TopSite({
      title: topSite.title,
      url: topSite.url,
    }));
  }
}
