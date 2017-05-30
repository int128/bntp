import * as bookmarks from './bookmarks/reducers'
import * as notifications from './notifications/reducers'
import * as preferences from './preferences/reducers'
import * as topsites from './topsites/reducers'

export default {
  ...bookmarks,
  ...notifications,
  ...preferences,
  ...topsites,
};
