var RestClient = require('../util/RestClient.jsx');
var ChromePages = require('./ChromePages.json');

var traverseBookmarkTree = function (folder) {
  var sites      = folder.children.filter(function (child) { return child.url; });
  var subfolders = folder.children.filter(function (child) { return !child.url; });
  var aggregated = [];
  if (sites.length > 0) {
    folder.children = sites;
    aggregated.push(folder);
  }
  return Array.prototype.concat.apply(aggregated, subfolders.map(traverseBookmarkTree));
};

var groupBookmarksByFolder = function (tree) {
  return traverseBookmarkTree({children: tree});
};

module.exports = {
  loadFromChrome: function (callback) {
    chrome.bookmarks.getTree(function (tree) {
      var folders = groupBookmarksByFolder(tree);
      folders.push(ChromePages);
      callback(folders);
    });
  },
  loadDemo: function (callback) {
    RestClient.get('demo.json', function (data) {
      var folders = groupBookmarksByFolder(data.bookmarks);
      folders.push(ChromePages);
      callback(folders);
    });
  }
};
