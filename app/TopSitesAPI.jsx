var React = require('react');

module.exports = {
  loadFromChrome: function (callback) {
    chrome.topSites.get(callback);
  },
  loadDemo: function (callback) {
    var req = new XMLHttpRequest();
    req.open('GET', 'demo.json', false);
    req.send();
    var data = JSON.parse(req.response);
    callback(data.topSites);
  }
};
