import { themeRepository } from '.';

const SELECTED_THEME_ID = 'SELECTED_THEME_ID';

export default class ThemePreferenceRepository {
  getOrDefault() {
    return themeRepository.findById(localStorage.getItem(SELECTED_THEME_ID)) || themeRepository.first();
  }

  save(theme) {
    localStorage.setItem(SELECTED_THEME_ID, theme.id);
  }

  poll() {
    return new Promise(resolve => {
      const callback = e => {
        if (e.storageArea === localStorage && e.key === SELECTED_THEME_ID && e.newValue !== null) {
          window.removeEventListener('storage', callback);
          resolve();
        }
      }
      window.addEventListener('storage', callback);
    });
  }
}
