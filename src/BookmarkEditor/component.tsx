import './component.css'
import { removeBookmark, updateBookmark } from '../Bookmarks/repository'
import { Bookmark } from '../Bookmarks/model'
import { EditingBookmark } from './model'
import { FC } from 'react'
import { faviconBackgroundImage } from '../infrastructure/favicon'
import { shortcutKeyOf } from '../ShortcutKey/model'
import { useShortcutMap } from '../ShortcutKey/repository'

type BookmarkEditorComponentProps = {
  editingBookmark?: EditingBookmark
  onChange: (newValue: Bookmark) => void
  onRequestClose: () => void
}

const BookmarkEditorComponent: FC<BookmarkEditorComponentProps> = ({ editingBookmark, onChange, onRequestClose }) => {
  const [shortcutMap, setShortcutMap] = useShortcutMap()
  if (editingBookmark === undefined) {
    return null
  }
  const onSubmit = async () => {
    await updateBookmark(editingBookmark)
    setShortcutMap(shortcutMap.set(editingBookmark.id, editingBookmark.shortcutKey))
  }
  const onRemove = async () => {
    await removeBookmark(editingBookmark)
    setShortcutMap(shortcutMap.set(editingBookmark.id, undefined))
  }
  return (
    <div>
      <div className="BookmarkEditor__Modal">
        <FormComponent
          bookmark={editingBookmark}
          onChange={onChange}
          onRequestClose={onRequestClose}
          onSubmit={() => {
            onSubmit()
              .then(() => onRequestClose())
              // TODO: show error message
              .catch((e) => console.error(e))
          }}
          onRemove={() => {
            onRemove()
              .then(() => onRequestClose())
              // TODO: show error message
              .catch((e) => console.error(e))
          }}
        />
      </div>
      <div className="BookmarkEditor__Overlay" onClick={() => onRequestClose()} />
    </div>
  )
}

export default BookmarkEditorComponent

type FormComponentProps = {
  bookmark: EditingBookmark
  onChange: (newValue: EditingBookmark) => void
  onRequestClose: () => void
  onSubmit: () => void
  onRemove: () => void
}

const FormComponent: FC<FormComponentProps> = ({ bookmark, onChange, onSubmit, onRemove, onRequestClose }) => {
  return (
    <form
      className="BookmarkEditor__Form"
      onSubmit={(e) => {
        onSubmit()
        e.preventDefault()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onRequestClose()
        }
      }}
    >
      <div>
        <input
          type="text"
          value={bookmark.title}
          className="BookmarkEditor__TextInput"
          autoFocus={true}
          onChange={(e) => onChange({ ...bookmark, title: e.target.value })}
        />
      </div>
      <div>
        <input
          type="text"
          value={bookmark.url}
          className="BookmarkEditor__UrlInput"
          style={{ backgroundImage: faviconBackgroundImage(bookmark.url) }}
          onChange={(e) => onChange({ ...bookmark, url: e.target.value })}
        />
      </div>
      <div>
        <input
          type="text"
          value={bookmark.shortcutKey ?? ''}
          maxLength={1}
          className="BookmarkEditor__TextInput"
          placeholder="Shortcut Key (not assigned)"
          onChange={(e) => onChange({ ...bookmark, shortcutKey: shortcutKeyOf(e.target.value) })}
        />
      </div>
      <div>
        <input type="submit" value="Update" className="BookmarkEditor__Button BookmarkEditor__Left" />
        <div className="BookmarkEditor__Message BookmarkEditor__Left">{/* TODO: error message */}</div>
        <input
          type="button"
          value="Remove"
          className="BookmarkEditor__Button BookmarkEditor__Right"
          onClick={() => onRemove()}
        />
      </div>
      <div className="BookmarkEditor__ClearFix"></div>
    </form>
  )
}
