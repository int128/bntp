import { themeRepository } from '..';

const SELECTED_THEME_ID = 'SELECTED_THEME_ID';

export default class ThemePreferenceRepository {
  getOrDefault() {
    return themeRepository.findById(localStorage.getItem(SELECTED_THEME_ID)) || themeRepository.first();
  }

  save(theme) {
    localStorage.setItem(SELECTED_THEME_ID, theme.id);
  }

  onChange(callback) {
    window.addEventListener('storage', e => {
      if (e.storageArea === localStorage && e.key === SELECTED_THEME_ID && e.newValue !== null) {
        callback(this.findById(e.newValue));
      }
    });
  }
}