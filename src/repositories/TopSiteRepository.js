import { Seq } from 'immutable';

import Link from '../models/Link';
import TopSite from '../models/TopSite';

export default class TopSiteRepository {
  findAll(callback) {
    return window.chrome.topSites.get(topSites =>
      callback(Seq(topSites).map(topSite => new TopSite({
        title: topSite.title,
        link: new Link({url: topSite.url}),
      }))));
  }
}
