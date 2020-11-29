import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const topSites = useTopSites();
  const bookmarkFolders = useBookmarkFolders();
  return (
    <div className="App">
      <h2>TopSites</h2>
      <div className="TopSites">
        <ul>
          {topSites.map((e, i) => <li key={i}><a href={e.url}>{e.title}</a></li>)}
        </ul>
      </div>
      <h2>Bookmarks</h2>
      <div className="Bookmarks">
        <ul>
          {bookmarkFolders.map((folder, i) =>
            <li key={i}>
              {folder.title}
              <ul>
                {folder.bookmarks.map((bookmark, i) =>
                  <li key={i}>
                    <a href={bookmark.url}>{bookmark.title}</a>
                  </li>)}
              </ul>
            </li>)}
        </ul>
      </div>
    </div>
  );
}

function useTopSites() {
  const [topSites, setTopSites] = useState<chrome.topSites.MostVisitedURL[]>([]);
  useEffect(() => {
    chrome.topSites.get(results => {
      setTopSites(results);
    });
  }, []);
  return topSites;
}

function useBookmarkFolders() {
  const [bookmarkFolders, setBookmarkFolders] = useState<BookmarkFolder[]>([]);
  useEffect(() => {
    chrome.bookmarks.getTree(results => {
      setBookmarkFolders(flatten(results));
    });
  }, []);
  return bookmarkFolders;
}

interface BookmarkFolder {
  title: string;
  bookmarks: Bookmark[];
}

interface Bookmark {
  title: string;
  url: string;
}

function flatten(nodes: chrome.bookmarks.BookmarkTreeNode[]): BookmarkFolder[] {
  return nodes.flatMap(traverse);
}

function traverse(node: chrome.bookmarks.BookmarkTreeNode, depth = 0): BookmarkFolder[] {
  if (node.children === undefined) {
    return []
  }

  const folderNodes = node.children.filter(child => child.url === undefined);
  const folders = folderNodes.flatMap(folderNode => traverse(folderNode, depth + 1));

  const bookmarkNodes = node.children.filter(child => child.url !== undefined);
  if (bookmarkNodes.length > 0) {
    const folder = {
      title: node.title,
      bookmarks: bookmarkNodes.map(b => ({
        title: b.title,
        url: b.url || '',
      })),
    };
    return [folder].concat(folders);
  }
  return folders;
}

export default App;
