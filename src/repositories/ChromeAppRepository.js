import { Seq } from 'immutable';

import ChromeApp from '../models/ChromeApp';
import Folder from '../models/Folder';

export default class ChromeAppRepository {
  findFolders(callback) {
    return window.chrome.management.getAll(managements =>
      callback(
        Seq.of(
          new Folder({
            id: 'App',
            title: 'Chrome Apps',
            items: Seq(managements)
              .filter(management => /\w+_app/.test(management.type))
              .map(app => new ChromeApp({
                id: app.id,
                title: app.name,
                icons: app.icons,
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
