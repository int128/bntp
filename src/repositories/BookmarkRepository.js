import { Seq } from 'immutable';
import ChromePromise from 'chrome-promise';

import Bookmark from '../models/Bookmark';
import Folder from '../models/Folder';

export default class BookmarkRepository {
  chrome = new ChromePromise();

  *findAll() {
    return BookmarkRepository.flatten(yield this.chrome.bookmarks.getTree());
  }

  static flatten(tree) {
    function traverse(parent) {
      const children = Seq(parent.children);
      const folders = children.filter(child => child.url === undefined).flatMap(traverse);
      const folder = new Folder({
        id: parent.id,
        title: parent.title,
        items: children.filterNot(child => child.url === undefined)
          .map(child => new Bookmark({
            id: child.id,
            title: child.title,
            url: child.url,
          })),
      });
      if (folder.items.isEmpty()) {
        return folders;
      } else {
        return Seq.of(folder).concat(folders);
      }
    }
    return traverse({children: tree});
  }

  *update(bookmark) {
    return yield this.chrome.bookmarks.update(bookmark.id, {
      title: bookmark.title,
      url: bookmark.url,
    });
  }

  *remove(bookmark) {
    return yield this.chrome.bookmarks.remove(bookmark.id);
  }

  poll() {
    return new Promise(resolve => {
      const callback = e => {
        window.chrome.bookmarks.onCreated.removeListener(callback);
        window.chrome.bookmarks.onRemoved.removeListener(callback);
        window.chrome.bookmarks.onChanged.removeListener(callback);
        window.chrome.bookmarks.onMoved.removeListener(callback);
        window.chrome.bookmarks.onChildrenReordered.removeListener(callback);
        resolve(e);
      };

      window.chrome.bookmarks.onCreated.addListener(callback);
      window.chrome.bookmarks.onRemoved.addListener(callback);
      window.chrome.bookmarks.onChanged.addListener(callback);
      window.chrome.bookmarks.onMoved.addListener(callback);
      window.chrome.bookmarks.onChildrenReordered.addListener(callback);
    });
  }
}
