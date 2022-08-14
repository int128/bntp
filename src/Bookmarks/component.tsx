import './component.css'
import { Bookmark, BookmarkFolder, BookmarkPosition, FolderCollapse, filterBookmarks } from './model'
import { Drag, Drop, insertDrop } from './viewmodel'
import React, { Dispatch, FC, PropsWithChildren, useState } from 'react'
import { moveBookmark, useBookmarkFolders, useFolderCollapse } from './repository'
import BookmarkEditorComponent from '../BookmarkEditor/component'
import { EditingBookmark } from '../BookmarkEditor/model'
import Link from '../Link/component'
import ShortcutKeyComponent from '../ShortcutKey/component'
import { ShortcutMap } from '../ShortcutKey/model'
import { faviconImage } from '../infrastructure/favicon'
import { useShortcutMap } from '../ShortcutKey/repository'
import { useToggles } from '../Toggles/repository'

type BookmarksComponentProps = {
  search: string
}

const BookmarksComponent: FC<BookmarksComponentProps> = ({ search }) => {
  const bookmarkFolders = useBookmarkFolders()
  const [shortcutMap] = useShortcutMap()
  return (
    <>
      <BookmarkFoldersComponent bookmarkFolders={bookmarkFolders} shortcutMap={shortcutMap} search={search} />
      <ShortcutKeyComponent bookmarkFolders={bookmarkFolders} shortcutMap={shortcutMap} />
    </>
  )
}

export default BookmarksComponent

type BookmarkFoldersComponentProps = {
  bookmarkFolders: readonly BookmarkFolder[]
  shortcutMap: ShortcutMap
  search: string
}

const BookmarkFoldersComponent: FC<BookmarkFoldersComponentProps> = ({ bookmarkFolders, shortcutMap, search }) => {
  const [toggles] = useToggles()
  const [folderCollapse, setFolderCollapse] = useFolderCollapse()
  const [drag, setDrag] = useState<Drag>()
  return (
    <div className="BookmarkFolders">
      {bookmarkFolders.map((f, i) => (
        <BookmarkFolderIndent key={i} depth={toggles.indent ? f.depth : 0}>
          <BookmarkFolderCollapse folder={f} folderCollapse={folderCollapse} setFolderCollapse={setFolderCollapse}>
            <BookmarkFolderItems folder={f} shortcutMap={shortcutMap} search={search} drag={drag} setDrag={setDrag} />
          </BookmarkFolderCollapse>
        </BookmarkFolderIndent>
      ))}
    </div>
  )
}

type BookmarkFolderIndentProps = {
  depth: number
} & PropsWithChildren

const BookmarkFolderIndent: FC<BookmarkFolderIndentProps> = ({ depth, children }) => (
  <div className="BookmarkFolder__Indent" style={{ '--depth': depth } as React.CSSProperties}>
    {children}
  </div>
)

type BookmarkFolderCollapseProps = {
  folder: BookmarkFolder
  folderCollapse: FolderCollapse
  setFolderCollapse: (newSet: FolderCollapse) => void
} & PropsWithChildren

const BookmarkFolderCollapse: FC<BookmarkFolderCollapseProps> = ({
  folder,
  folderCollapse,
  setFolderCollapse,
  children,
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
      {children}
    </section>
  )
}

type BookmarkFolderItemsProps = {
  folder: BookmarkFolder
  shortcutMap: ShortcutMap
  search: string
  drag: Drag | undefined
  setDrag: Dispatch<Drag | undefined>
}

const BookmarkFolderItems: FC<BookmarkFolderItemsProps> = ({ folder, shortcutMap, search, drag, setDrag }) => {
  const bookmarks = filterBookmarks(folder.bookmarks, search)
  const items = insertDrop(bookmarks, drag?.position)
  return (
    <>
      {items.map((e) => {
        if (e instanceof Drop) {
          return <BookmarkDropComponent key="drop" drag={drag} />
        }
        return <BookmarkComponent key={e.id} bookmark={e} shortcutMap={shortcutMap} drag={drag} setDrag={setDrag} />
      })}
    </>
  )
}

type BookmarkComponentProps = {
  bookmark: Bookmark
  shortcutMap: ShortcutMap
  drag: Drag | undefined
  setDrag: Dispatch<Drag | undefined>
}

const BookmarkComponent: FC<BookmarkComponentProps> = ({ bookmark, shortcutMap, drag, setDrag }) => {
  const [editingBookmark, setEditingBookmark] = useState<EditingBookmark>()
  const shortcutKey = shortcutMap.getByBookmarkID(bookmark.id)
  return (
    <div className="Bookmark">
      <Link href={bookmark.url}>
        <div
          className="BookmarkButton"
          draggable
          onDragStart={(e) => {
            setDrag(new Drag(bookmark))
            e.dataTransfer.effectAllowed = 'move'
          }}
          onDragOver={(e) => {
            if (drag) {
              e.preventDefault()
              setDrag(drag.moveDropTo(new BookmarkPosition(bookmark.folderID, bookmark.index)))
            }
          }}
          onDragEnd={() => setDrag(undefined)}
        >
          <div className="BookmarkButton__Title">{bookmark.title}</div>
          <img className="BookmarkButton__Icon" alt="" src={faviconImage(bookmark.url)} />
          {shortcutKey ? <div className="BookmarkButton__Badge">{shortcutKey}</div> : null}
        </div>
      </Link>
      <a
        href="#Edit"
        className="BookmarkEditButton"
        onClick={(e) => {
          setEditingBookmark(new EditingBookmark(bookmark, shortcutKey))
          e.preventDefault()
        }}
      >
        &hellip;
      </a>
      <BookmarkEditorComponent
        editingBookmark={editingBookmark}
        onChange={setEditingBookmark}
        onRequestClose={() => setEditingBookmark(undefined)}
      />
    </div>
  )
}

type BookmarkDropComponentProps = {
  drag?: Drag
}

const BookmarkDropComponent: FC<BookmarkDropComponentProps> = ({ drag }) => {
  if (!drag) {
    return null
  }
  return (
    <div
      className="BookmarkDrop"
      onDragOver={(e) => {
        e.preventDefault()
      }}
      onDrop={(e) => {
        e.preventDefault()
        console.info(`moving bookmark`, drag)
        moveBookmark(drag.source, drag.position).catch(console.error)
      }}
    >
      {drag.position.index}
    </div>
  )
}
