import { Seq } from 'immutable';

import TopSite from '../models/TopSite';

export default class TopSiteRepository {
  findAll(callback) {
    return window.chrome.topSites.get(topSites =>
      callback(Seq(topSites).map(topSite => new TopSite({
        title: topSite.title,
        url: topSite.url,
      }))));
  }
}
