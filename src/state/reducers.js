import * as folder from './folder/reducers'
import * as folderItem from './folderItem/reducers'
import * as folderItemEditor from './folderItemEditor/reducers'
import * as notifications from './notifications/reducers'
import * as preferences from './preferences/reducers'

export default {
  ...folder,
  ...folderItem,
  ...folderItemEditor,
  ...notifications,
  ...preferences,
};
