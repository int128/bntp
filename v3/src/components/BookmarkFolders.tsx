import React, { useEffect, useState } from 'react';
import { Bookmark, BookmarkFolder } from '../models';
import { subscribeBookmarks } from '../repositories/Bookmarks';

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

function useBookmarkFolders() {
  const [bookmarkFolders, setBookmarkFolders] = useState<BookmarkFolder[]>([]);
  useEffect(() => {
    const subscription = subscribeBookmarks(bookmarkFolders => {
      setBookmarkFolders(bookmarkFolders);
    });
    subscription.refresh();
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return bookmarkFolders;
}
