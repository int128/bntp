class NetworkService {
  isOnline = () => window.navigator.onLine;

  onChange(callback) {
    window.addEventListener('online', () => callback(true));
    window.addEventListener('offline', () => callback(false));
  }
}

export const networkService = new NetworkService();
