import './component.css'
import { Bookmark, BookmarkFolder } from './model'
import React, { FC, ReactElement, useState } from 'react'
import { useBookmarkFolders, useCollapsedBookmarkFolderIDs } from './repository'
import BookmarkEditorComponent from '../BookmarkEditor/component'
import { EditingBookmark } from '../BookmarkEditor/model'
import ShortcutKeyComponent from '../ShortcutKey/component'
import { ShortcutMap } from '../ShortcutKey/model'
import { useShortcutMap } from '../ShortcutKey/repository'
import { useToggles } from '../Toggles/repository'

const BookmarksComponent: FC = () => {
  const bookmarkFolders = useBookmarkFolders()
  const [shortcutMap] = useShortcutMap()
  const [editingBookmark, setEditingBookmark] = useState<EditingBookmark>()
  return (
    <div>
      <BookmarkFoldersComponent
        bookmarkFolders={bookmarkFolders}
        shortcutMap={shortcutMap}
        onEditClick={setEditingBookmark}
      />
      <BookmarkEditorComponent
        editingBookmark={editingBookmark}
        onChange={setEditingBookmark}
        onRequestClose={() => setEditingBookmark(undefined)}
      />
      <ShortcutKeyComponent bookmarkFolders={bookmarkFolders} shortcutMap={shortcutMap} />
    </div>
  )
}

export default BookmarksComponent

type onEditClickHandler = {
  onEditClick: (b: EditingBookmark) => void
}

type BookmarkFoldersComponentProps = {
  bookmarkFolders: BookmarkFolder[]
  shortcutMap: ShortcutMap
} & onEditClickHandler

const BookmarkFoldersComponent: FC<BookmarkFoldersComponentProps> = ({ bookmarkFolders, shortcutMap, onEditClick }) => {
  const [toggles] = useToggles()
  return (
    <div className="Bookmarks">
      {bookmarkFolders.map((f, i) => (
        <BookmarkFolderIndent key={i} depth={toggles.indent ? f.depth : 0}>
          <BookmarkFolderComponent folder={f} shortcutMap={shortcutMap} onEditClick={onEditClick} />
        </BookmarkFolderIndent>
      ))}
    </div>
  )
}

type BookmarkFolderIndentProps = {
  depth: number
  children: ReactElement
}

const BookmarkFolderIndent: FC<BookmarkFolderIndentProps> = ({ depth, children }) => (
  <div className="BookmarkFolder__Indent" style={{ '--depth': depth } as React.CSSProperties}>
    {children}
  </div>
)

type BookmarkFolderComponentProps = {
  folder: BookmarkFolder
  shortcutMap: ShortcutMap
} & onEditClickHandler

const BookmarkFolderComponent: FC<BookmarkFolderComponentProps> = ({ folder, shortcutMap, onEditClick }) => {
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
        <BookmarkComponent key={i} bookmark={b} shortcutMap={shortcutMap} onEditClick={onEditClick} />
      ))}
    </section>
  )
}

type BookmarkComponentProps = {
  bookmark: Bookmark
  shortcutMap: ShortcutMap
} & onEditClickHandler

const BookmarkComponent: FC<BookmarkComponentProps> = ({ bookmark, shortcutMap, onEditClick }) => {
  const favicon = `chrome://favicon/${bookmark.url}`
  const shortcutKey = shortcutMap.getByBookmarkID(bookmark.id)
  return (
    <div className="Bookmark">
      <Link href={bookmark.url}>
        <div className="Bookmark__Button">
          {shortcutKey ? <div className="Bookmark__ButtonBadge">{shortcutKey}</div> : null}
          <div className="Bookmark__ButtonBody" style={{ backgroundImage: `url(${favicon})` }}>
            {bookmark.title}
          </div>
        </div>
      </Link>
      <div className="Bookmark__EditButton">
        <a
          href="#Edit"
          onClick={(e) => {
            onEditClick({ ...bookmark, shortcutKey })
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
