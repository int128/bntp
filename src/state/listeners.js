import bookmarks from './bookmarks/listeners'
import chromeApps from './chromeApps/listeners'
import themeSelection from './themeSelection/listeners'
import topsites from './topsites/listeners'
import visibilities from './visibilities/listeners'
import folderPreferences from './folderPreferences/listeners'
import folderItemEditor from './folderItemEditor/listeners'

export default {
  ...bookmarks,
  ...chromeApps,
  ...themeSelection,
  ...topsites,
  ...visibilities,
  ...folderPreferences,
  ...folderItemEditor
};
