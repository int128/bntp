import RestClient from '../util/RestClient.js';

export default {
  get(callback) {
    window.chrome.topSites.get(callback);
  },
  getForDemo(callback) {
    RestClient.get('demo.json', data => callback(data.topSites));
  }
}
