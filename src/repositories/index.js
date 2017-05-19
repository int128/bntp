import { Seq } from 'immutable';

import {
  Link,
  Bookmark,
  BookmarkFolder,
  BookmarkTree,
  TopSite,
  FolderPreference,
  Theme,
  Visibility,
  Visibilities,
} from '../models';

import CHROME_PAGES from './ChromePages.json';

const SELECTED_THEME_ID = 'SELECTED_THEME_ID';
const COLLAPSED_FOLDERS = 'COLLAPSED_FOLDERS';
const HIDDEN_COMPONENTS = 'HIDDEN_COMPONENTS';

class BookmarkRepository {
  findAll(callback) {
    return window.chrome.bookmarks.getTree(tree =>
      callback(new BookmarkTree({children: tree, canEdit: true}).flatten()));
  }

  update(bookmark, callback) {
    window.chrome.bookmarks.update(bookmark.id, {
      title: bookmark.title,
      url: bookmark.link.url,
    }, callback);
  }

  onChange(callback) {
    window.chrome.bookmarks.onCreated.addListener(callback);
    window.chrome.bookmarks.onRemoved.addListener(callback);
    window.chrome.bookmarks.onChanged.addListener(callback);
    window.chrome.bookmarks.onMoved.addListener(callback);
    window.chrome.bookmarks.onChildrenReordered.addListener(callback);
  }
}

export const bookmarkRepository = new BookmarkRepository();

class ChromeAppRepository {
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

  onChange(callback) {
    window.chrome.management.onInstalled.addListener(callback);
    window.chrome.management.onUninstalled.addListener(callback);
    window.chrome.management.onEnabled.addListener(callback);
    window.chrome.management.onDisabled.addListener(callback);
  }
}

export const chromeAppRepository = new ChromeAppRepository();

class ChromePageRepository {
  findFolders() {
    return new BookmarkTree({children: [CHROME_PAGES]}).flatten();
  }
}

export const chromePageRepository = new ChromePageRepository();

class TopSiteRepository {
  findAll(callback) {
    return window.chrome.topSites.get(topSites =>
      callback(Seq(topSites).map(topSite => new TopSite({
        title: topSite.title,
        link: new Link({url: topSite.url}),
      }))));
  }
}

export const topSiteRepository = new TopSiteRepository();

class FolderPreferenceRepository {
  get() {
    return FolderPreference.fromString(localStorage.getItem(COLLAPSED_FOLDERS));
  }

  save(folderPreference) {
    localStorage.setItem(COLLAPSED_FOLDERS, folderPreference.toString());
  }

  onChange(callback) {
    window.addEventListener('storage', e => {
      if (e.storageArea === localStorage && e.key === COLLAPSED_FOLDERS && e.newValue !== null) {
        callback(FolderPreference.fromString(e.newValue));
      }
    });
  }
}

export const folderPreferenceRepository = new FolderPreferenceRepository();

class ThemeRepository {
  static all = Seq.of(
    new Theme({id: 'light', title: 'Light'}),
    new Theme({id: 'dark', title: 'Dark'}),
    new Theme({id: 'solarized-light', title: 'Solarized Light'}),
    new Theme({id: 'solarized-dark', title: 'Solarized Dark'}),
  )

  first = () => ThemeRepository.all.first()

  findAll = () => ThemeRepository.all

  findById = id => ThemeRepository.all.find(theme => theme.id === id)
}

export const themeRepository = new ThemeRepository();

class ThemePreferenceRepository {
  getOrDefault() {
    return themeRepository.findById(localStorage.getItem(SELECTED_THEME_ID)) || themeRepository.first();
  }

  save(theme) {
    localStorage.setItem(SELECTED_THEME_ID, theme.id);
  }

  onChange(callback) {
    window.addEventListener('storage', e => {
      if (e.storageArea === localStorage && e.key === SELECTED_THEME_ID && e.newValue !== null) {
        callback(this.findById(e.newValue));
      }
    });
  }
}

export const themePreferenceRepository = new ThemePreferenceRepository();

class VisibilityRepository {
  static all = Seq.of(
    new Visibility({id: 'top-sites', title: 'Top Sites'}),
    new Visibility({id: 'bookmarks', title: 'Bookmarks'}),
  )

  findAll() {
    const hiddenIds = Seq(JSON.parse(localStorage.getItem(HIDDEN_COMPONENTS)));
    return new Visibilities(
      VisibilityRepository.all.map(visibility =>
        visibility.set('visible', !hiddenIds.find(id => id === visibility.id))));
  }

  save(visibilities) {
    const hiddenIds = visibilities.findHidden().map(visibility => visibility.id);
    localStorage.setItem(HIDDEN_COMPONENTS, JSON.stringify(hiddenIds));
  }

  onChange(callback) {
    window.addEventListener('storage', e => {
      if (e.storageArea === localStorage && e.key === HIDDEN_COMPONENTS && e.newValue !== null) {
        callback(this.findAll());
      }
    });
  }
}

export const visibilityRepository = new VisibilityRepository();
