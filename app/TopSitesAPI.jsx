var RestClient = require('./RestClient.jsx');

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
