import bookmarks from './bookmarks/listeners'
import notifications from './notifications/listeners'
import preferences from './preferences/listeners'
import topsites from './topsites/listeners'

export default {
  ...bookmarks,
  ...notifications,
  ...preferences,
  ...topsites,
};
