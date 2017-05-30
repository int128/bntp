import BookmarkRepository from './BookmarkRepository';
import ChromeAppRepository from './ChromeAppRepository';
import ChromePageRepository from './ChromePageRepository';
import TopSiteRepository from './TopSiteRepository';
import FolderPreferenceRepository from './FolderPreferenceRepository';
import ThemeRepository from './ThemeRepository';
import ThemePreferenceRepository from './ThemePreferenceRepository';
import VisibilityRepository from './VisibilityRepository';

export const bookmarkRepository = new BookmarkRepository();
export const chromeAppRepository = new ChromeAppRepository();
export const chromePageRepository = new ChromePageRepository();
export const topSiteRepository = new TopSiteRepository();
export const folderPreferenceRepository = new FolderPreferenceRepository();
export const themeRepository = new ThemeRepository();
export const themePreferenceRepository = new ThemePreferenceRepository();
export const visibilityRepository = new VisibilityRepository();
