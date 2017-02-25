export default {
  get(callback) {
    window.chrome.management.getAll(items => callback(items.filter(item => /\w+_app/.test(item.type))));
  },
  addChangeListener(callback) {
    window.chrome.management.onInstalled.addListener(callback);
    window.chrome.management.onUninstalled.addListener(callback);
    window.chrome.management.onEnabled.addListener(callback);
    window.chrome.management.onDisabled.addListener(callback);
  }
}
