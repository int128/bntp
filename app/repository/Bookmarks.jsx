import RestClient from '../util/RestClient.jsx';

import ChromePages from './ChromePages.json';

export default {
  get(callback) {
    chrome.bookmarks.getTree((tree) => callback(arrange(tree)));
  },
  getForDemo(callback) {
    RestClient.get('demo.json', (data) => callback(arrange(data.bookmarks)));
  },
  addChangeListener(callback) {
    chrome.bookmarks.onCreated.addListener(callback);
    chrome.bookmarks.onRemoved.addListener(callback);
    chrome.bookmarks.onChanged.addListener(callback);
    chrome.bookmarks.onMoved.addListener(callback);
    chrome.bookmarks.onChildrenReordered.addListener(callback);
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
