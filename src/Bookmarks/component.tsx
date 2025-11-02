import './component.css'
import type React from 'react'
import { type Dispatch, type FC, type PropsWithChildren, useContext, useState } from 'react'
import BookmarkEditorComponent from '../BookmarkEditor/component'
import { FaviconContext } from '../infrastructure/favicon'
import LinkComponent from '../Link/component'
import ShortcutKeyComponent from '../ShortcutKey/component'
import type { ShortcutMap } from '../ShortcutKey/model'
import { useShortcutMap } from '../ShortcutKey/repository'
import { useToggles } from '../Toggles/repository'
import { type Bookmark, type BookmarkFolder, type FolderCollapse, filterBookmarks, type Position } from './model'
import { moveBookmark, useBookmarkFolders, useFolderCollapse } from './repository'
import { type BookmarkWithDragProps, Drag, reorderBookmarks } from './viewmodel'

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
      {bookmarkFolders.map((folder) => (
        <BookmarkFolderIndent key={folder.id} depth={toggles.indent ? folder.depth : 0}>
          <BookmarkFolderCollapse folder={folder} folderCollapse={folderCollapse} setFolderCollapse={setFolderCollapse}>
            <BookmarkList folder={folder} shortcutMap={shortcutMap} search={search} drag={drag} setDrag={setDrag} />
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
        <div className="BookmarkFolder__Heading">
          <a
            href="#Expand"
            onClick={(e) => {
              setFolderCollapse(folderCollapse.expand(folder.id))
              e.preventDefault()
            }}
          >
            {folder.title}
          </a>
        </div>
      </section>
    )
  }
  return (
    <section className="BookmarkFolder">
      <div className="BookmarkFolder__Heading">
        <a
          href="#Collapse"
          onClick={(e) => {
            setFolderCollapse(folderCollapse.collapse(folder.id))
            e.preventDefault()
          }}
        >
          {folder.title}
        </a>
      </div>
      {children}
    </section>
  )
}

type BookmarkListProps = {
  folder: BookmarkFolder
  shortcutMap: ShortcutMap
  search: string
  drag: Drag | undefined
  setDrag: Dispatch<Drag | undefined>
}

const BookmarkList: FC<BookmarkListProps> = ({ folder, shortcutMap, search, drag, setDrag }) => {
  const bookmarks = reorderBookmarks(drag, folder.id, filterBookmarks(folder.bookmarks, search))
  return (
    <>
      {bookmarks.map((b, index) => (
        <BookmarkDragDrop
          key={b.id}
          bookmark={b}
          position={{ folderID: folder.id, index }}
          drag={drag}
          setDrag={setDrag}
        >
          <BookmarkComponent bookmark={b} shortcutMap={shortcutMap} dragActive={drag ? true : undefined} />
        </BookmarkDragDrop>
      ))}
    </>
  )
}

const classNameOfMap = (classNameMap: { [className: string]: boolean | undefined }) =>
  Object.entries(classNameMap)
    .filter(([, enabled]) => enabled === true)
    .map(([className]) => className)
    .join(' ')

type BookmarkDragDropProps = {
  bookmark: BookmarkWithDragProps
  position: Position
  drag: Drag | undefined
  setDrag: Dispatch<Drag | undefined>
} & PropsWithChildren

const BookmarkDragDrop: FC<BookmarkDragDropProps> = ({ bookmark, position, drag, setDrag, children }) => {
  return (
    <div
      role="none"
      className={classNameOfMap({
        Bookmark__DragDrop__From: bookmark.dragFrom,
        Bookmark__DragDrop__To: bookmark.dragTo,
      })}
      data-bookmark-drag-state={bookmark.state}
      onDragStart={(e) => {
        setDrag(Drag.start(bookmark, position))
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', bookmark.url)
      }}
      onDragOver={(e) => {
        if (drag) {
          e.preventDefault()
        }
      }}
      onDragEnter={(e) => {
        if (drag) {
          e.preventDefault()
          setDrag(drag.enterTo(position))
        }
      }}
      onDragLeave={(e) => {
        // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget
        const exitedFrom = e.target
        const enteredTo = e.relatedTarget
        if (
          drag &&
          exitedFrom instanceof HTMLElement &&
          exitedFrom.classList.contains('BookmarkButton') &&
          enteredTo instanceof HTMLElement &&
          enteredTo.classList.contains('BookmarkFolder')
        ) {
          setDrag(drag.leave())
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
      {children}
    </div>
  )
}

type BookmarkComponentProps = {
  bookmark: Bookmark
  shortcutMap: ShortcutMap
  dragActive: true | undefined
}

const BookmarkComponent: FC<BookmarkComponentProps> = ({ bookmark, shortcutMap, dragActive }) => {
  const [openBookmarkEditor, setOpenBookmarkEditor] = useState(false)
  const favicon = useContext(FaviconContext)
  const shortcutKey = shortcutMap.getByBookmarkID(bookmark.id)
  return (
    <div className="Bookmark">
      <LinkComponent href={bookmark.url}>
        <div className="BookmarkButton" data-drag-active={dragActive} draggable>
          <div className="BookmarkButton__Title">{bookmark.title}</div>
          <img className="BookmarkButton__Icon" alt="" src={favicon.getImageUrl(bookmark.url)} />
          {shortcutKey ? <div className="BookmarkButton__Badge">{shortcutKey}</div> : null}
        </div>
      </LinkComponent>
      <a
        href="#Edit"
        className="BookmarkEditButton"
        data-drag-active={dragActive}
        onClick={(e) => {
          setOpenBookmarkEditor(true)
          e.preventDefault()
        }}
      >
        &hellip;
      </a>
      <BookmarkEditorComponent
        open={openBookmarkEditor}
        bookmark={bookmark}
        shortcutKey={shortcutKey}
        onRequestClose={() => setOpenBookmarkEditor(false)}
      />
    </div>
  )
}
