import { Record, Seq } from 'immutable';

import Link from './Link';
import Bookmark from './Bookmark';
import BookmarkFolder from './BookmarkFolder';

const BookmarkTreeRecord = Record({
  children: [],
  canEdit: false,
});

export default class BookmarkTree extends BookmarkTreeRecord {
  flatten() {
    const canEdit = this.canEdit;
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
            canEdit,
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
