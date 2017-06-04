import bookmarks from './bookmarks/listeners'
import chromeApps from './chromeApps/listeners'
import notifications from './notifications/listeners'
import themeSelection from './themeSelection/listeners'
import topsites from './topsites/listeners'
import visibilities from './visibilities/listeners'
import folderPreferences from './folderPreferences/listeners'
import folderItemPreferences from './folderItemPreferences/listeners'
import folderItemEditor from './folderItemEditor/listeners'

export default {
  ...bookmarks,
  ...chromeApps,
  ...notifications,
  ...themeSelection,
  ...topsites,
  ...visibilities,
  ...folderPreferences,
  ...folderItemPreferences,
  ...folderItemEditor
};
