import { FC } from 'react'
import { Bookmark } from '../Bookmarks/model'

import './component.css'

type BookmarkEditorComponentProps = {
  bookmark?: Bookmark
  onRequestClose: () => void
}

const BookmarkEditorComponent: FC<BookmarkEditorComponentProps> = ({ bookmark, onRequestClose }) => {
  if (bookmark === undefined) {
    return null
  }
  return (
    <div>
      <div className="BookmarkEditor__Modal">
        <FormComponent
          bookmark={bookmark}
          onSubmit={() => {
            onRequestClose()
          }}
          onRemove={() => {
            onRequestClose()
          }}
        />
      </div>
      <div className="BookmarkEditor__Overlay" onClick={onRequestClose} />
    </div>
  )
}

export default BookmarkEditorComponent

type FormComponentProps = {
  bookmark: Bookmark
  onSubmit: () => void
  onRemove: () => void
}

const FormComponent: FC<FormComponentProps> = ({ bookmark, onSubmit, onRemove }) => {
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
        <input type="text" defaultValue={bookmark.title} className="BookmarkEditor__TextInput" />
      </div>
      <div>
        <input
          type="text"
          defaultValue={bookmark.url}
          className="BookmarkEditor__UrlInput"
          style={{ backgroundImage: `url(${favicon})` }}
        />
      </div>
      <div>
        <input
          type="text"
          defaultValue={undefined /* message */}
          maxLength={1}
          className="BookmarkEditor__TextInput"
          placeholder="Shortcut Key (not assigned)"
        />
      </div>
      <div>
        <input type="submit" value="Update" className="BookmarkEditor__Button BookmarkEditor__Left" />
        <div className="BookmarkEditor__Message BookmarkEditor__Left">{/* message */}</div>
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
