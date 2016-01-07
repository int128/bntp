import RestClient from '../util/RestClient.jsx';

export default {
  get(callback) {
    chrome.topSites.get(callback);
  },
  getForDemo(callback) {
    RestClient.get('demo.json', data => callback(data.topSites));
  }
}
