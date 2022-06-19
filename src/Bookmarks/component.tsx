import { FC, ReactElement, useEffect, useState } from 'react'
import {
  Bookmark,
  BookmarkFolder,
  BookmarkFolderPreference,
  collapseBookmarkFolder,
  expandBookmarkFolder,
} from './model'

import './component.css'
import { subscribeBookmarks } from './repository'
import { useLocalStorage } from '../infrastructure/localstorage'
import BookmarkEditor from '../BookmarkEditor/component'

type BookmarksComponentProps = {
  indent: boolean
}

const BookmarksComponent: FC<BookmarksComponentProps> = ({ indent }) => {
  const [editingBookmark, setEditingBookmark] = useState<Bookmark>()
  return (
    <div>
      <BookmarkFoldersComponent indent={indent} onEditClick={setEditingBookmark} />
      <BookmarkEditor bookmark={editingBookmark} onRequestClose={() => setEditingBookmark(undefined)} />
    </div>
  )
}

export default BookmarksComponent

type BookmarkFoldersComponentProps = {
  indent: boolean
  onEditClick: (bookmark: Bookmark) => void
}

const BookmarkFoldersComponent: FC<BookmarkFoldersComponentProps> = ({ indent, onEditClick }) => {
  const bookmarkFolders = useBookmarkFolders()
  const [preference, setPreference] = useLocalStorage<BookmarkFolderPreference>('v3.bookmarkFolderPreference', {
    collapsedIDs: [],
  })
  return (
    <div className="Bookmarks">
      {bookmarkFolders.map((f, i) => (
        <div key={i} style={{ marginLeft: indent ? f.depth * 80 : undefined }}>
          <BookmarkFolderComponent
            folder={f}
            collapsed={preference.collapsedIDs.includes(f.id)}
            onExpand={() => setPreference(expandBookmarkFolder(preference, f.id))}
            onCollapse={() => setPreference(collapseBookmarkFolder(preference, f.id))}
            onEditClick={onEditClick}
          />
        </div>
      ))}
    </div>
  )
}

type BookmarkFolderComponentProps = {
  folder: BookmarkFolder
  collapsed: boolean
  onCollapse: () => void
  onExpand: () => void
  onEditClick: (bookmark: Bookmark) => void
}

const BookmarkFolderComponent: FC<BookmarkFolderComponentProps> = ({
  folder,
  collapsed,
  onCollapse,
  onExpand,
  onEditClick,
}) => {
  if (collapsed) {
    return (
      <section className="BookmarkFolder">
        <div className="BookmarkFolder__Heading BookmarkFolder__Heading__Collapsed">
          <a
            href="#Expand"
            onClick={(e) => {
              onExpand()
              e.preventDefault()
            }}
          >
            <span className="BookmarkFolder__HeadingText">{folder.title}</span>
          </a>
        </div>
      </section>
    )
  }
  return (
    <section className="BookmarkFolder">
      <div className="BookmarkFolder__Heading BookmarkFolder__Heading__Expand">
        <a
          href="#Collapse"
          onClick={(e) => {
            onCollapse()
            e.preventDefault()
          }}
        >
          <span className="BookmarkFolder__HeadingText">{folder.title}</span>
        </a>
      </div>
      {folder.bookmarks.map((b, i) => (
        <BookmarkComponent key={i} bookmark={b} onEditClick={onEditClick} />
      ))}
    </section>
  )
}

type BookmarkComponentProps = {
  bookmark: Bookmark
  onEditClick: (bookmark: Bookmark) => void
}

const BookmarkComponent: FC<BookmarkComponentProps> = ({ bookmark, onEditClick }) => {
  const favicon = `chrome://favicon/${bookmark.url}`
  return (
    <div className="Bookmark">
      <Link href={bookmark.url}>
        <div className="Bookmark__Button">
          {
            //<div className="Bookmark__ButtonBadge">A</div>
          }
          <div className="Bookmark__ButtonBody" style={{ backgroundImage: `url(${favicon})` }}>
            {bookmark.title}
          </div>
        </div>
      </Link>
      <div className="Bookmark__EditButton">
        <a
          href="#Edit"
          onClick={(e) => {
            onEditClick(bookmark)
            e.preventDefault()
          }}
        >
          &hellip;
        </a>
      </div>
    </div>
  )
}

type LinkProps = {
  href: string
  children: ReactElement
}

const Link: FC<LinkProps> = ({ href, children }) => {
  // handle the special links
  if (href.match(/^(chrome|file|javascript):/)) {
    return (
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault()
          void chrome.tabs.create({ url: href })
        }}
      >
        {children}
      </a>
    )
  }
  return <a href={href}>{children}</a>
}

export const useBookmarkFolders = () => {
  const [bookmarkFolders, setBookmarkFolders] = useState<BookmarkFolder[]>([])
  useEffect(() => {
    const subscription = subscribeBookmarks((bookmarkFolders) => setBookmarkFolders(bookmarkFolders))
    subscription.refresh()
    return () => subscription.unsubscribe()
  }, [])
  return bookmarkFolders
}
