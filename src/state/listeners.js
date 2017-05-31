import bookmarks from './bookmarks/listeners'
import bookmarkPreference from './bookmarkPreference/listeners'
import chromeApps from './chromeApps/listeners'
import folderPreferences from './folderPreferences/listeners'
import notifications from './notifications/listeners'
import themeSelection from './themeSelection/listeners'
import topsites from './topsites/listeners'
import visibilities from './visibilities/listeners'

export default {
  ...bookmarks,
  ...bookmarkPreference,
  ...chromeApps,
  ...folderPreferences,
  ...notifications,
  ...themeSelection,
  ...topsites,
  ...visibilities,
};
