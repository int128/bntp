import BookmarkRepository from './bookmarks/BookmarkRepository';
import ChromeAppRepository from './bookmarks/ChromeAppRepository';
import ChromePageRepository from './bookmarks/ChromePageRepository';

import TopSiteRepository from './topsites/TopSiteRepository';

import FolderPreferenceRepository from './preferences/FolderPreferenceRepository';
import ThemeRepository from './preferences/ThemeRepository';
import ThemePreferenceRepository from './preferences/ThemePreferenceRepository';
import VisibilityRepository from './preferences/VisibilityRepository';

export const bookmarkRepository = new BookmarkRepository();
export const chromeAppRepository = new ChromeAppRepository();
export const chromePageRepository = new ChromePageRepository();
export const topSiteRepository = new TopSiteRepository();
export const folderPreferenceRepository = new FolderPreferenceRepository();
export const themeRepository = new ThemeRepository();
export const themePreferenceRepository = new ThemePreferenceRepository();
export const visibilityRepository = new VisibilityRepository();
