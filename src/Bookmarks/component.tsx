import './component.css'
import { Bookmark, BookmarkFolder, FolderCollapse, filterBookmarks } from './model'
import React, { Dispatch, FC, PropsWithChildren, useState } from 'react'
import { useBookmarkFolders, useFolderCollapse } from './repository'
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

type DragContext =
  | {
      source: Bookmark
      destination: Bookmark
    }
  | undefined

const BookmarkFoldersComponent: FC<BookmarkFoldersComponentProps> = ({ bookmarkFolders, shortcutMap, search }) => {
  const [toggles] = useToggles()
  const [folderCollapse, setFolderCollapse] = useFolderCollapse()
  const [dropIndex, setDropIndex] = useState<DragContext>()
  return (
    <div className="BookmarkFolders">
      {bookmarkFolders.map((f, i) => (
        <BookmarkFolderIndent key={i} depth={toggles.indent ? f.depth : 0}>
          <BookmarkFolderCollapse folder={f} folderCollapse={folderCollapse} setFolderCollapse={setFolderCollapse}>
            <BookmarkFolderItems
              folder={f}
              shortcutMap={shortcutMap}
              search={search}
              dragContext={dropIndex}
              setDragContext={setDropIndex}
            />
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
  dragContext: DragContext
  setDragContext: Dispatch<DragContext>
}

const BookmarkFolderItems: FC<BookmarkFolderItemsProps> = ({
  folder,
  shortcutMap,
  search,
  dragContext,
  setDragContext,
}) => {
  const bookmarks = filterBookmarks(folder.bookmarks, search)
  return (
    <>
      {bookmarks.flatMap((b) => {
        const bookmarkComponent = (
          <BookmarkComponent
            key={b.id}
            bookmark={b}
            shortcutMap={shortcutMap}
            dragContext={dragContext}
            setDragContext={setDragContext}
          />
        )
        if (dragContext) {
          if (dragContext.source.index === dragContext.destination.index) {
            return bookmarkComponent
          }
          if (b.folderID === dragContext.destination.folderID && b.index === dragContext.destination.index) {
            return [bookmarkComponent, <DropComponent key={`${b.id}-drop`} dragContext={dragContext} />]
          }
        }
        return bookmarkComponent
      })}
    </>
  )
}

type BookmarkComponentProps = {
  bookmark: Bookmark
  shortcutMap: ShortcutMap
  dragContext: DragContext
  setDragContext: Dispatch<DragContext>
}

const BookmarkComponent: FC<BookmarkComponentProps> = ({ bookmark, shortcutMap, dragContext, setDragContext }) => {
  const [editingBookmark, setEditingBookmark] = useState<EditingBookmark>()
  const shortcutKey = shortcutMap.getByBookmarkID(bookmark.id)
  return (
    <div className="Bookmark">
      <Link href={bookmark.url}>
        <div
          className="BookmarkButton"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.effectAllowed = 'move'
            setDragContext({ source: bookmark, destination: bookmark })
            e.dataTransfer.setData('application/bookmark-id', bookmark.id)
          }}
          onDragOver={(e) => {
            if (e.dataTransfer.types.includes('application/bookmark-id')) {
              if (dragContext) {
                setDragContext({ ...dragContext, destination: bookmark })
              }
            }
          }}
          onDragEnd={() => setDragContext(undefined)}
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

type DropComponentProps = {
  dragContext: DragContext
}

const DropComponent: FC<DropComponentProps> = ({ dragContext }) => (
  <div
    className="BookmarkDrop"
    onDragOver={(e) => {
      if (e.dataTransfer.types.includes('application/bookmark-id')) {
        e.preventDefault()
      }
    }}
    onDrop={(e) => {
      e.preventDefault()
      if (dragContext === undefined) {
        return
      }
      const { source, destination } = dragContext
      let destinationIndex = destination.index
      if (source.folderID === destination.folderID) {
        if (source.index === destination.index) {
          return
        }
        // https://stackoverflow.com/questions/13264060/chrome-bookmarks-api-using-move-to-reorder-bookmarks-in-the-same-folder
        if (source.index < destination.index) {
          destinationIndex++
        }
      }
      console.info(`moving bookmark`, source, destination)
      chrome.bookmarks.move(source.id, { parentId: destination.folderID, index: destinationIndex }).catch(console.error)
    }}
  ></div>
)
