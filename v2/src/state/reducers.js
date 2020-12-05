import * as folderItem from './folderItem/reducers'
import * as folderItemEditor from './folderItemEditor/reducers'
import * as notifications from './notifications/reducers'
import * as preferences from './preferences/reducers'

export default {
  ...folderItem,
  ...folderItemEditor,
  ...notifications,
  ...preferences,
};
