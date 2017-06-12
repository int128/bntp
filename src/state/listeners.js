import folder from './folder/listeners'
import folderItem from './folderItem/listeners'
import folderItemEditor from './folderItemEditor/listeners'
import preferences from './preferences/listeners'
import keyHook from './keyHook/listeners'

export default {
  ...folder,
  ...folderItem,
  ...folderItemEditor,
  ...preferences,
  ...keyHook,
};
