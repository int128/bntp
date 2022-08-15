import './component.css'
import { Bookmark, BookmarkFolder, FolderCollapse, Position, filterBookmarks } from './model'
import { Drag, reorderBookmarks } from './viewmodel'
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
  const bookmarks = reorderBookmarks(drag, folder.id, filterBookmarks(folder.bookmarks, search))
  return (
    <>
      {bookmarks.map((b, index) => (
        <BookmarkComponent
          key={b.id}
          bookmark={b}
          position={{ folderID: folder.id, index }}
          shortcutMap={shortcutMap}
          drag={drag}
          setDrag={setDrag}
        />
      ))}
    </>
  )
}

type BookmarkComponentProps = {
  bookmark: Bookmark
  position: Position
  shortcutMap: ShortcutMap
  drag: Drag | undefined
  setDrag: Dispatch<Drag | undefined>
}

const BookmarkComponent: FC<BookmarkComponentProps> = ({ bookmark, position, shortcutMap, drag, setDrag }) => {
  const [editingBookmark, setEditingBookmark] = useState<EditingBookmark>()
  const shortcutKey = shortcutMap.getByBookmarkID(bookmark.id)
  return (
    <div
      className="Bookmark"
      data-drag={drag ? true : undefined}
      data-drag-from={drag?.isFrom(position) || undefined}
      data-drag-to={drag?.isTo(position) || undefined}
    >
      <Link href={bookmark.url}>
        <div
          className="BookmarkButton"
          draggable
          onDragStart={(e) => {
            setDrag(Drag.start(bookmark, position))
            e.dataTransfer.effectAllowed = 'move'
          }}
          onDragOver={(e) => {
            if (drag) {
              e.preventDefault()
            }
          }}
          onDragEnter={(e) => {
            if (drag) {
              e.preventDefault()
              setDrag(drag.moveTo(position)) // update on enter for better performance
            }
          }}
          onDragEnd={() => {
            setDrag(undefined)
          }}
          onDrop={(e) => {
            e.preventDefault()
            if (drag) {
              moveBookmark(drag.bookmark, drag.calculateDestination()).catch(console.error)
              setDrag(undefined)
            }
          }}
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
