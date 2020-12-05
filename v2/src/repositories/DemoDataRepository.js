import BookmarkRepository from './BookmarkRepository';
import TopSiteRepository from './TopSiteRepository';

export default class DemoDataRepository {
  *get() {
    const json = yield fetch('/demo.json').then(res => res.json());
    const bookmarkFolders = BookmarkRepository.flatten(json.bookmarks);
    const topSites = TopSiteRepository.mapJson(json.topSites);
    return {bookmarkFolders, topSites};
  }
}
