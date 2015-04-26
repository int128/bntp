var RestClient = require('../util/RestClient.jsx');

module.exports = {
  loadFromChrome: function (callback) {
    chrome.topSites.get(callback);
  },
  loadDemo: function (callback) {
    RestClient.get('demo.json', function (data) {
      callback(data.topSites);
    });
  }
};
