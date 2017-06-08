import folder from './folder/listeners'
import folderItem from './folderItem/listeners'
import folderItemEditor from './folderItemEditor/listeners'
import themeSelection from './themeSelection/listeners'
import visibilities from './visibilities/listeners'

export default {
  ...folder,
  ...folderItem,
  ...folderItemEditor,
  ...themeSelection,
  ...visibilities,
};
