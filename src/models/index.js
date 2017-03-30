import { Record, Seq } from 'immutable';

const BookmarkRecord = Record({
  id: null,
  title: null,
  url: null,
});

export class Bookmark extends BookmarkRecord {
  getIcon() {
    return `chrome://favicon/${this.url}`;
  }
}

const BookmarkFolderRecord = Record({
  id: null,
  title: null,
  bookmarks: Seq(),
  collapsed: false,
});

export class BookmarkFolder extends BookmarkFolderRecord {
}

const BookmarkTreeRecord = Record({
  children: [],
});

export class BookmarkTree extends BookmarkTreeRecord {
  flatten() {
    function traverse(parent) {
      const children = Seq(parent.children);
      const bookmarkFolders = children.filter(child => child.url === undefined).flatMap(traverse);
      const bookmarkFolder = new BookmarkFolder({
        id: parent.id,
        title: parent.title,
        bookmarks: children.filterNot(child => child.url === undefined).map(child => new Bookmark(child)),
      });
      if (bookmarkFolder.bookmarks.isEmpty()) {
        return bookmarkFolders;
      } else {
        return Seq.of(bookmarkFolder).concat(bookmarkFolders);
      }
    }
    return traverse(this);
  }
}

const ChromeAppRecord = Record({
  id: null,
  name: null,
  icons: [],
});

export class ChromeApp extends ChromeAppRecord {
  findLargestIcon() {
    const icon = Seq(this.icons).maxBy(icon => icon.size);
    if (icon !== null) {
      return icon.url;
    } else {
      return null;
    }
  }
}

const TopSiteRecord = Record({
  url: null,
});

export class TopSite extends TopSiteRecord {
  getIcon() {
    return `chrome://favicon/${this.url}`;
  }
}

const ThemeRecord = Record({
  id: null,
  title: null,
});

export class Theme extends ThemeRecord {
}
