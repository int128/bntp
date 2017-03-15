import { CurrentTheme } from '../../repository/Preferences.js';

import './index.css';

export default {
  render(element) {
    CurrentTheme.onChange((theme) => element.className = `Theme__${theme}`);
    element.className = `Theme__${CurrentTheme.find()}`;
  }
};
