import { FC, ReactElement, useState } from 'react'
import { Bookmark, BookmarkFolder } from './model'
import { useBookmarkFolders, useCollapsedBookmarkFolderIDs } from './repository'
import BookmarkEditor from '../BookmarkEditor/component'

import './component.css'

type BookmarksComponentProps = {
  indent: boolean
}

const BookmarksComponent: FC<BookmarksComponentProps> = ({ indent }) => {
  const [editingBookmark, setEditingBookmark] = useState<Bookmark>()
  return (
    <div>
      <BookmarkFoldersComponent indent={indent} onEditClick={setEditingBookmark} />
      <BookmarkEditor
        bookmark={editingBookmark}
        onChange={setEditingBookmark}
        onRequestClose={() => setEditingBookmark(undefined)}
      />
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
  return (
    <div className="Bookmarks">
      {bookmarkFolders.map((f, i) => (
        <div key={i} style={{ marginLeft: indent ? f.depth * 80 : undefined }}>
          <BookmarkFolderComponent folder={f} onEditClick={onEditClick} />
        </div>
      ))}
    </div>
  )
}

type BookmarkFolderComponentProps = {
  folder: BookmarkFolder
  onEditClick: (bookmark: Bookmark) => void
}

const BookmarkFolderComponent: FC<BookmarkFolderComponentProps> = ({ folder, onEditClick }) => {
  const [collapsedBookmarkFolderIDs, setCollapsedBookmarkFolderIDs] = useCollapsedBookmarkFolderIDs()
  const collapsed = collapsedBookmarkFolderIDs.some((id) => id === folder.id)
  if (collapsed) {
    return (
      <section className="BookmarkFolder">
        <div className="BookmarkFolder__Heading BookmarkFolder__Heading__Collapsed">
          <a
            href="#Expand"
            onClick={(e) => {
              const removed = collapsedBookmarkFolderIDs.filter((id) => id !== folder.id)
              setCollapsedBookmarkFolderIDs(removed)
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
            const added = [...collapsedBookmarkFolderIDs, folder.id]
            setCollapsedBookmarkFolderIDs(added)
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
