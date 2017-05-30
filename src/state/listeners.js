import bookmarks from './bookmarks/listeners'
import chromeApps from './chromeApps/listeners'
import folderPreferences from './folderPreferences/listeners'
import notifications from './notifications/listeners'
import themeSelection from './themeSelection/listeners'
import topsites from './topsites/listeners'
import visibilities from './visibilities/listeners'

export default {
  ...bookmarks,
  ...chromeApps,
  ...folderPreferences,
  ...notifications,
  ...themeSelection,
  ...topsites,
  ...visibilities,
};
