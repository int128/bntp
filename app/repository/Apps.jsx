export default {
  get(callback) {
    chrome.management.getAll(items => callback(items.filter(item => /\w+_app/.test(item.type))));
  },
  addChangeListener(callback) {
    chrome.management.onInstalled.addListener(callback);
    chrome.management.onUninstalled.addListener(callback);
    chrome.management.onEnabled.addListener(callback);
    chrome.management.onDisabled.addListener(callback);
  }
}
