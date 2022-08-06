import './component.css'
import { Bookmark, BookmarkFolder, FolderCollapse } from './model'
import React, { FC, ReactElement, useState } from 'react'
import { useBookmarkFolders, useFolderCollapse } from './repository'
import BookmarkEditorComponent from '../BookmarkEditor/component'
import { EditingBookmark } from '../BookmarkEditor/model'
import ShortcutKeyComponent from '../ShortcutKey/component'
import { ShortcutMap } from '../ShortcutKey/model'
import { faviconBackgroundImage } from '../infrastructure/favicon'
import { useShortcutMap } from '../ShortcutKey/repository'
import { useToggles } from '../Toggles/repository'

const BookmarksComponent: FC = () => {
  const bookmarkFolders = useBookmarkFolders()
  const [shortcutMap] = useShortcutMap()
  return (
    <div>
      <BookmarkFoldersComponent bookmarkFolders={bookmarkFolders} shortcutMap={shortcutMap} />
      <ShortcutKeyComponent bookmarkFolders={bookmarkFolders} shortcutMap={shortcutMap} />
    </div>
  )
}

export default BookmarksComponent

type BookmarkFoldersComponentProps = {
  bookmarkFolders: BookmarkFolder[]
  shortcutMap: ShortcutMap
}

const BookmarkFoldersComponent: FC<BookmarkFoldersComponentProps> = ({ bookmarkFolders, shortcutMap }) => {
  const [toggles] = useToggles()
  const [folderCollapse, setFolderCollapse] = useFolderCollapse()
  return (
    <div className="Bookmarks">
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
        <div className="Bookmark__Button">
          {shortcutKey ? <div className="Bookmark__ButtonBadge">{shortcutKey}</div> : null}
          <div className="Bookmark__ButtonBody" style={{ backgroundImage: faviconBackgroundImage(bookmark.url) }}>
            {bookmark.title}
          </div>
        </div>
      </Link>
      <div className="Bookmark__EditButton">
        <a
          href="#Edit"
          onClick={(e) => {
            setEditingBookmark({ ...bookmark, shortcutKey })
            e.preventDefault()
          }}
        >
          &hellip;
        </a>
      </div>
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
