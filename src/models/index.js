import { Record, Seq, Map } from 'immutable';

const LinkRecord = Record({
  url: null,
  app: false,
  icons: null,
});

export class Link extends LinkRecord {
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

const BookmarkRecord = Record({
  id: null,
  title: null,
  link: null,
});

export class Bookmark extends BookmarkRecord {
}

const BookmarkFolderRecord = Record({
  id: null,
  title: null,
  bookmarks: Seq(),
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
        bookmarks: children.filterNot(child => child.url === undefined)
          .map(child => new Bookmark({
            id: child.id,
            title: child.title,
            link: new Link({url: child.url}),
          })),
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

const TopSiteRecord = Record({
  link: null,
  title: null,
});

export class TopSite extends TopSiteRecord {
}

export class FolderPreference {
  static fromString(json) {
    return new FolderPreference(JSON.parse(json));
  }

  constructor(folderIdMap) {
    this.folderIdMap = Map(folderIdMap);
  }

  isCollapse(folder) {
    return this.folderIdMap.get(folder.id) === true;
  }

  toggle(folder) {
    if (this.isCollapse(folder)) {
      return new FolderPreference(this.folderIdMap.remove(folder.id));
    } else {
      return new FolderPreference(this.folderIdMap.set(folder.id, true));
    }
  }

  toString() {
    return JSON.stringify(this.folderIdMap.toJSON());
  }
}

const ThemeRecord = Record({
  id: null,
  title: null,
});

export class Theme extends ThemeRecord {
}

const VisibilityRecord = Record({
  id: null,
  title: null,
  visible: true,
});

export class Visibility extends VisibilityRecord {
}

export class Visibilities {
  constructor(visibilities) {
    this.visibilities = Seq(visibilities);
  }

  map = mapper => this.visibilities.map(mapper)

  isVisible(id) {
    return this.visibilities.find(v => v.id === id && v.visible === true) !== undefined;
  }

  findHidden() {
    return this.visibilities.filter(v => v.visible === false);
  }

  toggle(visibility) {
    return new Visibilities(this.visibilities.map(v => {
      if (v.equals(visibility)) {
        return v.set('visible', !v.visible);
      } else {
        return v;
      }
    }));
  }
}
