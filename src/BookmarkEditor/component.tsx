import './component.css'
import { removeBookmark, updateBookmark, useShortcutMap } from '../Bookmarks/repository'
import { Bookmark } from '../Bookmarks/model'
import { EditingBookmark } from './model'
import { FC } from 'react'

type BookmarkEditorComponentProps = {
  editingBookmark?: EditingBookmark
  onChange: (newValue: Bookmark) => void
  onRequestClose: () => void
}

const BookmarkEditorComponent: FC<BookmarkEditorComponentProps> = ({ editingBookmark, onChange, onRequestClose }) => {
  const [shortcutMap, setShortcutMap] = useShortcutMap()
  return (
    <div>
      {editingBookmark !== undefined ? (
        <div>
          <div className="BookmarkEditor__Modal">
            <FormComponent
              bookmark={editingBookmark}
              onChange={onChange}
              onSubmit={() => {
                const { shortcutKey } = editingBookmark
                if (!shortcutKey) {
                  setShortcutMap(shortcutMap.deleteByBookmarkID(editingBookmark.id))
                  onRequestClose()
                  return
                }
                void updateBookmark(editingBookmark).then(() => {
                  setShortcutMap(shortcutMap.set(editingBookmark.id, shortcutKey))
                  onRequestClose()
                })
              }}
              onRemove={() =>
                void removeBookmark(editingBookmark).then(() => {
                  setShortcutMap(shortcutMap.deleteByBookmarkID(editingBookmark.id))
                  onRequestClose()
                })
              }
            />
          </div>
          <div className="BookmarkEditor__Overlay" onClick={onRequestClose} />
        </div>
      ) : null}
    </div>
  )
}

export default BookmarkEditorComponent

type FormComponentProps = {
  bookmark: EditingBookmark
  onChange: (newValue: EditingBookmark) => void
  onSubmit: () => void
  onRemove: () => void
}

const FormComponent: FC<FormComponentProps> = ({ bookmark, onChange, onSubmit, onRemove }) => {
  const favicon = `chrome://favicon/${bookmark.url}`
  return (
    <form
      className="BookmarkEditor__Form"
      onSubmit={(e) => {
        onSubmit()
        e.preventDefault()
      }}
    >
      <div>
        <input
          type="text"
          value={bookmark.title}
          className="BookmarkEditor__TextInput"
          onChange={(e) => onChange({ ...bookmark, title: e.target.value })}
        />
      </div>
      <div>
        <input
          type="text"
          value={bookmark.url}
          className="BookmarkEditor__UrlInput"
          style={{ backgroundImage: `url(${favicon})` }}
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
          onChange={(e) => onChange({ ...bookmark, shortcutKey: e.target.value })}
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
