import { Seq } from 'immutable';

import Bookmark from '../models/Bookmark';
import Folder from '../models/Folder';

export default class BookmarkRepository {
  findAll(callback) {
    return window.chrome.bookmarks.getTree(tree => callback(BookmarkRepository.flatten(tree)));
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

  update(bookmark, callback) {
    window.chrome.bookmarks.update(bookmark.id, {
      title: bookmark.title,
      url: bookmark.url,
    }, callback);
  }

  remove(bookmark, callback) {
    window.chrome.bookmarks.remove(bookmark.id, callback);
  }

  addListener(callback) {
    window.chrome.bookmarks.onCreated.addListener(callback);
    window.chrome.bookmarks.onRemoved.addListener(callback);
    window.chrome.bookmarks.onChanged.addListener(callback);
    window.chrome.bookmarks.onMoved.addListener(callback);
    window.chrome.bookmarks.onChildrenReordered.addListener(callback);
  }

  removeListener(callback) {
    window.chrome.bookmarks.onCreated.removeListener(callback);
    window.chrome.bookmarks.onRemoved.removeListener(callback);
    window.chrome.bookmarks.onChanged.removeListener(callback);
    window.chrome.bookmarks.onMoved.removeListener(callback);
    window.chrome.bookmarks.onChildrenReordered.removeListener(callback);
  }
}
