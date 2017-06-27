import PreferenceStorage from '../infrastructure/PreferenceStorage';

import AppPreference from '../models/AppPreference';
import { THEMES } from '../models/Themes';

export default class AppPreferenceRepository {
  preferenceStorage = new PreferenceStorage('APP_PREFERENCE')
  oldHiddenComponentsStorage = new PreferenceStorage('HIDDEN_COMPONENTS')
  oldSelectedThemeIdStorage = new PreferenceStorage('SELECTED_THEME_ID')

  get() {
    const json = this.preferenceStorage.get();
    return this.migrateOldKey(new AppPreference({
      ...json,
      theme: THEMES.getById(json ? json.theme : null)
    }));
  }

  migrateOldKey(appPreference) {
    const selectedThemeId = this.oldSelectedThemeIdStorage.get();
    if (selectedThemeId !== null) {
      return appPreference.set('theme', THEMES.getById(selectedThemeId));
    } else {
      return appPreference;
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
    this.preferenceStorage.save(json);

    // remove old data
    this.oldHiddenComponentsStorage.remove();
    this.oldSelectedThemeIdStorage.remove();
  }

  poll() {
    return this.preferenceStorage.poll();
  }
}
