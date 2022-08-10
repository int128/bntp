import './component.css'
import { Bookmark, BookmarkFolder, FolderCollapse } from './model'
import React, { FC, ReactElement, useState } from 'react'
import { useBookmarkFolders, useFolderCollapse } from './repository'
import BookmarkEditorComponent from '../BookmarkEditor/component'
import { EditingBookmark } from '../BookmarkEditor/model'
import ShortcutKeyComponent from '../ShortcutKey/component'
import { ShortcutMap } from '../ShortcutKey/model'
import { faviconImage } from '../infrastructure/favicon'
import { useShortcutMap } from '../ShortcutKey/repository'
import { useToggles } from '../Toggles/repository'

const BookmarksComponent: FC = () => {
  const bookmarkFolders = useBookmarkFolders()
  const [shortcutMap] = useShortcutMap()
  return (
    <>
      <section className="BookmarksHeader">
        <h2>Bookmarks</h2>
        <Link href="chrome://bookmarks">Chrome Bookmark Manager</Link>
      </section>
      <BookmarkFoldersComponent bookmarkFolders={bookmarkFolders} shortcutMap={shortcutMap} />
      <ShortcutKeyComponent bookmarkFolders={bookmarkFolders} shortcutMap={shortcutMap} />
    </>
  )
}

export default BookmarksComponent

type BookmarkFoldersComponentProps = {
  bookmarkFolders: readonly BookmarkFolder[]
  shortcutMap: ShortcutMap
}

const BookmarkFoldersComponent: FC<BookmarkFoldersComponentProps> = ({ bookmarkFolders, shortcutMap }) => {
  const [toggles] = useToggles()
  const [folderCollapse, setFolderCollapse] = useFolderCollapse()
  return (
    <div className="BookmarkFolders">
      {bookmarkFolders.map((f, i) => (
        <BookmarkFolderIndent key={i} depth={toggles.indent ? f.depth : 0}>
          <BookmarkFolderComponent
            folder={f}
            shortcutMap={shortcutMap}
            folderCollapse={folderCollapse}
            setFolderCollapse={setFolderCollapse}
          />
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
  folderCollapse: FolderCollapse
  setFolderCollapse: (newSet: FolderCollapse) => void
}

const BookmarkFolderComponent: FC<BookmarkFolderComponentProps> = ({
  folder,
  shortcutMap,
  folderCollapse,
  setFolderCollapse,
}) => {
  if (folderCollapse.isCollapsed(folder.id)) {
    return (
      <section className="BookmarkFolder">
        <div className="BookmarkFolder__Heading BookmarkFolder__Heading__Collapsed">
          <a
            href="#Expand"
            onClick={(e) => {
              setFolderCollapse(folderCollapse.expand(folder.id))
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
            setFolderCollapse(folderCollapse.collapse(folder.id))
            e.preventDefault()
          }}
        >
          <span className="BookmarkFolder__HeadingText">{folder.title}</span>
        </a>
      </div>
      {folder.bookmarks.map((b, i) => (
        <BookmarkComponent key={i} bookmark={b} shortcutMap={shortcutMap} />
      ))}
    </section>
  )
}

type BookmarkComponentProps = {
  bookmark: Bookmark
  shortcutMap: ShortcutMap
}

const BookmarkComponent: FC<BookmarkComponentProps> = ({ bookmark, shortcutMap }) => {
  const [editingBookmark, setEditingBookmark] = useState<EditingBookmark>()
  const shortcutKey = shortcutMap.getByBookmarkID(bookmark.id)
  return (
    <div className="Bookmark">
      <Link href={bookmark.url}>
        <div className="BookmarkButton">
          <div className="BookmarkButton__Title">{bookmark.title}</div>
          <img className="BookmarkButton__Icon" alt="" src={faviconImage(bookmark.url)} />
          {shortcutKey ? <div className="BookmarkButton__Badge">{shortcutKey}</div> : null}
        </div>
      </Link>
      <a
        href="#Edit"
        onClick={(e) => {
          setEditingBookmark(new EditingBookmark(bookmark, shortcutKey))
          e.preventDefault()
        }}
      >
        <div className="BookmarkEditButton">&hellip;</div>
      </a>
      <BookmarkEditorComponent
        editingBookmark={editingBookmark}
        onChange={setEditingBookmark}
        onRequestClose={() => setEditingBookmark(undefined)}
      />
    </div>
  )
}

type LinkProps = {
  href: string
  children: ReactElement | string
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
