import Theme from '../models/Theme';
import Themes from '../models/Themes';

const SELECTED_THEME_ID = 'SELECTED_THEME_ID';

const THEMES = new Themes([
  new Theme({id: 'light', title: 'Light'}),
  new Theme({id: 'dark', title: 'Dark'}),
  new Theme({id: 'solarized-light', title: 'Solarized Light'}),
  new Theme({id: 'solarized-dark', title: 'Solarized Dark'}),
])

export default class ThemeRepository {
  getAll() {
    const id = localStorage.getItem(SELECTED_THEME_ID);
    return THEMES.select(THEMES.getById(id));
  }

  save(themes) {
    const id = themes.getSelected().id;
    localStorage.setItem(SELECTED_THEME_ID, id);
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
  }}
