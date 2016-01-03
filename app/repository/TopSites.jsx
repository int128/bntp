import RestClient from '../util/RestClient.jsx';

export default {
  loadFromChrome(callback) {
    chrome.topSites.get(callback);
  },
  loadDemo(callback) {
    RestClient.get('demo.json', (data) => callback(data.topSites));
  }
}
