import folder from './folder/listeners'
import folderItem from './folderItem/listeners'
import folderItemEditor from './folderItemEditor/listeners'
import preferences from './preferences/listeners'
import accessKey from './accessKey/listeners'

export default {
  ...folder,
  ...folderItem,
  ...folderItemEditor,
  ...preferences,
  ...accessKey,
};
