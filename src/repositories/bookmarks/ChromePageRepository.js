import BookmarkTree from '../../models/bookmarks/BookmarkTree';

import CHROME_PAGES from './ChromePages.json';

export default class ChromePageRepository {
  findFolders() {
    return new BookmarkTree({children: [CHROME_PAGES]}).flatten();
  }
}
