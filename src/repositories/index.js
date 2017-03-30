import { Seq } from 'immutable';

import {
  BookmarkTree,
  ChromeApp,
  TopSite,
  Theme,
} from '../models';

const SELECTED_THEME_ID = 'SELECTED_THEME_ID';

class BookmarkRepository {
  findAll = callback =>
    window.chrome.bookmarks.getTree(tree =>
      callback(new BookmarkTree({children: tree})))

  onChange = callback => {
    window.chrome.bookmarks.onCreated.addListener(callback);
    window.chrome.bookmarks.onRemoved.addListener(callback);
    window.chrome.bookmarks.onChanged.addListener(callback);
    window.chrome.bookmarks.onMoved.addListener(callback);
    window.chrome.bookmarks.onChildrenReordered.addListener(callback);
  }
}

export const bookmarkRepository = new BookmarkRepository();

class ChromeAppRepository {
  findAll = callback =>
    window.chrome.management.getAll(managements =>
      callback(Seq(managements)
        .filter(management => /\w+_app/.test(management.type))
        .map(app => new ChromeApp(app))))

  onChange = callback => {
    window.chrome.management.onInstalled.addListener(callback);
    window.chrome.management.onUninstalled.addListener(callback);
    window.chrome.management.onEnabled.addListener(callback);
    window.chrome.management.onDisabled.addListener(callback);
  }
}

export const chromeAppRepository = new ChromeAppRepository();

class TopSiteRepository {
  findAll = callback =>
    window.chrome.topSites.get(topSites =>
      callback(Seq(topSites).map(topSite => new TopSite(topSite))))
}

export const topSiteRepository = new TopSiteRepository();

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

  findSelected = () => this.findById(localStorage.getItem(SELECTED_THEME_ID))

  saveSelected = theme => localStorage.setItem(SELECTED_THEME_ID, theme.id)

  onSelect = callback => window.addEventListener('storage', e => {
    if (e.storageArea === localStorage && e.key === SELECTED_THEME_ID && e.newValue !== null) {
      callback(this.findById(e.newValue));
    }
  })
}

export const themeRepository = new ThemeRepository();
