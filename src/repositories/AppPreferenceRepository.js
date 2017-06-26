import AppPreference from '../models/AppPreference';

const APP_PREFERENCE = 'APP_PREFERENCE';

export default class AppPreferenceRepository {
  get() {
    const json = JSON.parse(localStorage.getItem(APP_PREFERENCE));
    return new AppPreference(json);
  }

  save(appPreference) {
    localStorage.setItem(APP_PREFERENCE, JSON.stringify(appPreference.toJS()));
    // clean up old key
    localStorage.removeItem('HIDDEN_COMPONENTS');
  }

  poll() {
    return new Promise(resolve => {
      const callback = e => {
        if (e.storageArea === localStorage && e.key === APP_PREFERENCE && e.newValue !== null) {
          window.removeEventListener('storage', callback);
          resolve();
        }
      }
      window.addEventListener('storage', callback);
    });
  }
}
