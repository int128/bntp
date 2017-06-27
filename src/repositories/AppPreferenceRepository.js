import AppPreference from '../models/AppPreference';
import { THEMES } from '../models/Themes';

const APP_PREFERENCE = 'APP_PREFERENCE';

export default class AppPreferenceRepository {
  get() {
    const json = JSON.parse(localStorage.getItem(APP_PREFERENCE));
    return new AppPreference({
      ...json,
      theme: THEMES.getById(json.theme),
    });
  }

  save(appPreference) {
    const json = appPreference.toJS();
    localStorage.setItem(APP_PREFERENCE, JSON.stringify({
      ...json,
      theme: json.theme.id,
    }));

    // clean up old key
    localStorage.removeItem('HIDDEN_COMPONENTS');
    localStorage.removeItem('SELECTED_THEME_ID');
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
