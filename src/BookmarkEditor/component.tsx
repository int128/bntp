import './component.css'
import { FC, useState } from 'react'
import { removeBookmark, updateBookmark, useBookmarkPreferences } from '../Bookmarks/repository'
import BookmarkFoldersComponent from '../Bookmarks/component'
import { EditingBookmark } from './model'

const BookmarkEditorComponent: FC = () => {
  const [editingBookmark, setEditingBookmark] = useState<EditingBookmark>()
  const [bookmarkPreferences, setBookmarkPreferences] = useBookmarkPreferences()
  const close = () => setEditingBookmark(undefined)
  return (
    <div>
      <BookmarkFoldersComponent
        onEditClick={(bookmark) => {
          const p = bookmarkPreferences.find((p) => p.id === bookmark.id)
          setEditingBookmark({ ...bookmark, shortcutKey: p?.shortcutKey })
        }}
      />
      {editingBookmark !== undefined ? (
        <div>
          <div className="BookmarkEditor__Modal">
            <FormComponent
              bookmark={editingBookmark}
              onChange={setEditingBookmark}
              onSubmit={() => {
                const { id, shortcutKey } = editingBookmark
                if (!shortcutKey) {
                  setBookmarkPreferences(bookmarkPreferences.filter((p) => p.id !== id))
                  close()
                  return
                }
                void updateBookmark(editingBookmark).then(() => {
                  setBookmarkPreferences([...bookmarkPreferences.filter((p) => p.id !== id), { id, shortcutKey }])
                  close()
                })
              }}
              onRemove={() =>
                void removeBookmark(editingBookmark).then(() => {
                  setBookmarkPreferences(bookmarkPreferences.filter((p) => p.id !== editingBookmark.id))
                  close()
                })
              }
            />
          </div>
          <div className="BookmarkEditor__Overlay" onClick={close} />
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
