import './RootTheme.css';

export default class RootTheme {
  static render(theme) {
    document.documentElement.className = `Theme__${theme.id}`;
  }
}
