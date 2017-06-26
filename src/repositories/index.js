import AppPreferenceRepository from './AppPreferenceRepository';
import BookmarkRepository from './BookmarkRepository';
import ChromeAppRepository from './ChromeAppRepository';
import ChromePageRepository from './ChromePageRepository';
import TopSiteRepository from './TopSiteRepository';
import FolderPreferenceRepository from './FolderPreferenceRepository';
import FolderItemPreferenceRepository from './FolderItemPreferenceRepository';
import ThemeRepository from './ThemeRepository';
import VisibilityRepository from './VisibilityRepository';

export const appPreferenceRepository = new AppPreferenceRepository();
export const bookmarkRepository = new BookmarkRepository();
export const chromeAppRepository = new ChromeAppRepository();
export const chromePageRepository = new ChromePageRepository();
export const topSiteRepository = new TopSiteRepository();
export const folderPreferenceRepository = new FolderPreferenceRepository();
export const folderItemPreferenceRepository = new FolderItemPreferenceRepository();
export const themeRepository = new ThemeRepository();
export const visibilityRepository = new VisibilityRepository();
