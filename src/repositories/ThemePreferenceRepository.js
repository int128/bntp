import { themeRepository } from '.';

const SELECTED_THEME_ID = 'SELECTED_THEME_ID';

export default class ThemePreferenceRepository {
  getOrDefault() {
    return themeRepository.findById(localStorage.getItem(SELECTED_THEME_ID)) || themeRepository.first();
  }

  save(theme) {
    localStorage.setItem(SELECTED_THEME_ID, theme.id);
  }

  addListener(callback) {
    const eventListener = e => {
      if (e.storageArea === localStorage && e.key === SELECTED_THEME_ID && e.newValue !== null) {
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