import { Seq } from 'immutable';

import Link from '../models/Link';
import Bookmark from '../models/Bookmark';
import BookmarkFolder from '../models/BookmarkFolder';

export default class ChromeAppRepository {
  findFolders(callback) {
    return window.chrome.management.getAll(managements =>
      callback(
        Seq.of(
          new BookmarkFolder({
            id: 'App',
            title: 'Chrome Apps',
            bookmarks: Seq(managements)
              .filter(management => /\w+_app/.test(management.type))
              .map(app => new Bookmark({
                id: app.id,
                title: app.name,
                link: new Link({
                  app: true,
                  url: app.id,
                  icons: app.icons,
                }),
              }))
          })
        )
      )
    );
  }

  addListener(callback) {
    window.chrome.management.onInstalled.addListener(callback);
    window.chrome.management.onUninstalled.addListener(callback);
    window.chrome.management.onEnabled.addListener(callback);
    window.chrome.management.onDisabled.addListener(callback);
  }

  removeListener(callback) {
    window.chrome.management.onInstalled.removeListener(callback);
    window.chrome.management.onUninstalled.removeListener(callback);
    window.chrome.management.onEnabled.removeListener(callback);
    window.chrome.management.onDisabled.removeListener(callback);
  }
}
