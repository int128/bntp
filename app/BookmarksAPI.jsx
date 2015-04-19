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
      callback(folders);
    });
  },
  loadDemo: function (callback) {
    var req = new XMLHttpRequest();
    req.open('GET', 'demo.json', false);
    req.send();
    var data = JSON.parse(req.response);
    var folders = groupBookmarksByFolder(data.bookmarks);
    callback(folders);
  }
};
