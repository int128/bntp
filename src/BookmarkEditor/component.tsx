import './component.css'
import { removeBookmark, updateBookmark } from '../Bookmarks/repository'
import { Bookmark } from '../Bookmarks/model'
import { FC } from 'react'

type BookmarkEditorComponentProps = {
  bookmark?: Bookmark
  onChange: (bookmark: Bookmark) => void
  onRequestClose: () => void
}

const BookmarkEditorComponent: FC<BookmarkEditorComponentProps> = ({ bookmark, onChange, onRequestClose }) => {
  if (bookmark === undefined) {
    return null
  }
  return (
    <div>
      <div className="BookmarkEditor__Modal">
        <FormComponent
          bookmark={bookmark}
          onChange={() => onChange(bookmark)}
          onSubmit={() => void updateBookmark(bookmark).then(() => onRequestClose())}
          onRemove={() => void removeBookmark(bookmark).then(() => onRequestClose())}
        />
      </div>
      <div className="BookmarkEditor__Overlay" onClick={() => onRequestClose()} />
    </div>
  )
}

export default BookmarkEditorComponent

type FormComponentProps = {
  bookmark: Bookmark
  onChange: (bookmark: Bookmark) => void
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
          value={undefined /* TODO */}
          maxLength={1}
          className="BookmarkEditor__TextInput"
          placeholder="Shortcut Key (not assigned)"
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
