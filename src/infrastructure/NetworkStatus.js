export default {
  addListener(eventListener) {
    window.addEventListener('online', eventListener);
    window.addEventListener('offline', eventListener);
  },

  removeListener(eventListener) {
    window.removeEventListener('online', eventListener);
    window.removeEventListener('offline', eventListener);
  },

  get() {
    return window.navigator.onLine;
  }
}
