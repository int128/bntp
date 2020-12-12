import React, { useEffect, useState } from 'react';

import './BookmarkFolders.css';

export function BookmarkFolders() {
  const bookmarkFolders = useBookmarkFolders();
  return (
    <div className="Bookmarks">
      {bookmarkFolders.map(BookmarkFolderComponent)}
    </div>
  );
}

function BookmarkFolderComponent(folder: BookmarkFolder, index: number) {
  return (
    <section className="BookmarkFolder" key={index}>
      <div className="BookmarkFolder__Heading BookmarkFolder__Heading__Expand">
        <span className="BookmarkFolder__HeadingText">{folder.title}</span>
      </div>

      {folder.bookmarks.map(BookmarkComponent)}
    </section>
  )
}

function BookmarkComponent(bookmark: Bookmark, index: number) {
  const favicon = `chrome://favicon/${bookmark.url}`;
  return (
    <div className="Bookmark" key={index}>
      <a href={bookmark.url}>
        <div className="Bookmark__Button">
          {
            //<div className="Bookmark__ButtonBadge">A</div>
          }
          <div className="Bookmark__ButtonBody" style={{ backgroundImage: `url(${favicon})` }}>
            {bookmark.title}
          </div>
        </div>
      </a>
      <div className="Bookmark__EditButton">
        <a href="#edit">&hellip;</a>
      </div>
    </div>
  )
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
