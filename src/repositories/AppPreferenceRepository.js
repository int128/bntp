import AppPreference from '../models/AppPreference';
import { THEMES } from '../models/Themes';

const APP_PREFERENCE = 'APP_PREFERENCE';
const SELECTED_THEME_ID = 'SELECTED_THEME_ID';
const HIDDEN_COMPONENTS = 'HIDDEN_COMPONENTS';

export default class AppPreferenceRepository {
  get() {
    const oldSelectedThemeId = JSON.parse(localStorage.getItem(SELECTED_THEME_ID));
    const json = JSON.parse(localStorage.getItem(APP_PREFERENCE));

    const theme = THEMES.getById(this.extractThemeIdFrom(json, oldSelectedThemeId));
    return new AppPreference({...json, theme});
  }

  extractThemeIdFrom(json, oldSelectedThemeId) {
    if (oldSelectedThemeId) {
      // migrate old key
      return oldSelectedThemeId;
    } else if (json) {
      return json.theme;
    } else {
      return null;
    }
  }

  /**
   * @param {AppPreference} appPreference 
   */
  save(appPreference) {
    const json = appPreference.toMap()
      .filter((value, key) => value !== AppPreference.DEFAULT.get(key))
      .map((value, key) => {
        switch (key) {
          case 'theme':
            return value.id;
          default:
            return value;
        }
      });
    localStorage.setItem(APP_PREFERENCE, JSON.stringify(json));

    // clean up old key
    localStorage.removeItem(HIDDEN_COMPONENTS);
    localStorage.removeItem(SELECTED_THEME_ID);
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
