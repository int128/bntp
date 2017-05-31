import BookmarkPreference from '../models/BookmarkPreference';

const BOOKMARK_PREFERENCES = 'BOOKMARK_PREFERENCES';

export default class BookmarkPreferenceRepository {
  get() {
    return BookmarkPreference.fromJSON(localStorage.getItem(BOOKMARK_PREFERENCES));
  }

  save(bookmarkPreference) {
    localStorage.setItem(BOOKMARK_PREFERENCES, bookmarkPreference.toJSON());
  }

  addListener(callback) {
    const eventListener = e => {
      if (e.storageArea === localStorage && e.key === BOOKMARK_PREFERENCES && e.newValue !== null) {
        callback();
      }
    };
    window.addEventListener('storage', eventListener);
    return eventListener;
  }

  removeListener(eventListener) {
    window.removeEventListener('storage', eventListener);
  }
}
