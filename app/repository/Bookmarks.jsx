import RestClient from '../util/RestClient.jsx';

import ChromePages from './ChromePages.json';

export default {
  loadFromChrome(callback) {
    chrome.bookmarks.getTree((tree) => callback(arrange(tree)));
  },
  loadDemo(callback) {
    RestClient.get('demo.json', (data) => callback(arrange(data.bookmarks)));
  }
}

function arrange(tree) {
  const folders = groupByFolder(tree);
  folders.push(ChromePages);
  return folders;
}

function groupByFolder(tree) {
  return traverseTree({children: tree});
}

function traverseTree(folder) {
  const sites      = folder.children.filter((child) => child.url);
  const subfolders = folder.children.filter((child) => !child.url);
  const aggregated = [];
  if (sites.length > 0) {
    folder.children = sites;
    aggregated.push(folder);
  }
  return Array.prototype.concat.apply(aggregated, subfolders.map(traverseTree));
}
