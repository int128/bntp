import { Seq } from 'immutable';
import ChromePromise from 'chrome-promise';

import Bookmark from '../models/Bookmark';
import Folder from '../models/Folder';

export default class BookmarkRepository {
  chrome = new ChromePromise();

  *findAll() {
    return BookmarkRepository.flatten(yield this.chrome.bookmarks.getTree());
  }

  static flatten(arrayOfBookmarkTreeNodes) {
    function traverse(node, depth = 0) {
      const folderNodes = Seq(node.children).filter(child => child.url === undefined);
      const bookmarkNodes = Seq(node.children).filter(child => child.url !== undefined);
      if (bookmarkNodes.isEmpty()) {
        return folderNodes.flatMap(child => traverse(child, depth));
      } else {
        return Seq.of(new Folder({
          id: node.id,
          title: node.title,
          items: bookmarkNodes.map(child => new Bookmark({
            id: child.id,
            title: child.title,
            url: child.url,
          })),
          depth,
        })).concat(folderNodes.flatMap(child => traverse(child, depth + 1)));
      }
    }
    return Seq(arrayOfBookmarkTreeNodes).flatMap(traverse);
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
