export default class NetworkStatus {
  static get() {
    return window.navigator.onLine;
  }

  static poll() {
    return new Promise(resolve => {
      const callback = e => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
        resolve(e);
      };

      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
    });
  }
}
