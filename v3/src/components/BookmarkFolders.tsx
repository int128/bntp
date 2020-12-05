import React, { useEffect, useState } from 'react';

export function BookmarkFolders() {
  const bookmarkFolders = useBookmarkFolders();
  return (
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
  );
}

interface BookmarkFolder {
  title: string;
  bookmarks: Bookmark[];
}

interface Bookmark {
  title: string;
  url: string;
}

function useBookmarkFolders() {
  const [bookmarkFolders, setBookmarkFolders] = useState<BookmarkFolder[]>([]);
  useEffect(() => {
    function handleChange() {
      chrome.bookmarks.getTree(results => setBookmarkFolders(flatten(results)));
    }
    handleChange();
    chrome.bookmarks.onChanged.addListener(handleChange);
    chrome.bookmarks.onChildrenReordered.addListener(handleChange);
    chrome.bookmarks.onCreated.addListener(handleChange);
    chrome.bookmarks.onMoved.addListener(handleChange);
    chrome.bookmarks.onRemoved.addListener(handleChange);
    return () => {
      chrome.bookmarks.onChanged.removeListener(handleChange);
      chrome.bookmarks.onChildrenReordered.removeListener(handleChange);
      chrome.bookmarks.onCreated.removeListener(handleChange);
      chrome.bookmarks.onMoved.removeListener(handleChange);
      chrome.bookmarks.onRemoved.removeListener(handleChange);
    };
  }, []);
  return bookmarkFolders;
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
