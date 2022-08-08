import './component.css'
import { FC, useEffect, useState } from 'react'
import { removeBookmark, updateBookmark } from '../Bookmarks/repository'
import { Bookmark } from '../Bookmarks/model'
import { EditingBookmark } from './model'
import { createPortal } from 'react-dom'
import { faviconImage } from '../infrastructure/favicon'
import { shortcutKeyOf } from '../ShortcutKey/model'
import { useShortcutMap } from '../ShortcutKey/repository'

type BookmarkEditorComponentProps = {
  editingBookmark?: EditingBookmark
  onChange: (newValue: Bookmark) => void
  onRequestClose: () => void
}

const BookmarkEditorComponent: FC<BookmarkEditorComponentProps> = ({ editingBookmark, onChange, onRequestClose }) => {
  const [errorMessage, setErrorMessage] = useState<string>()
  const [shortcutMap, setShortcutMap] = useShortcutMap()
  useEffect(
    // remove errorMessage when editingBookmark is changed
    () => setErrorMessage(undefined),
    [editingBookmark]
  )
  if (editingBookmark === undefined) {
    return null
  }
  const closeAfter = (f: () => Promise<void>) =>
    void f()
      .then(onRequestClose)
      .catch((e) => setErrorMessage(String(e)))
  return createPortal(
    <div className="BookmarkEditor">
      <div className="BookmarkEditor__Modal">
        <FormComponent
          bookmark={editingBookmark}
          errorMessage={errorMessage}
          onChange={onChange}
          onRequestClose={onRequestClose}
          onSubmit={() =>
            closeAfter(async () => {
              await updateBookmark(editingBookmark)
              setShortcutMap(shortcutMap.set(editingBookmark.id, editingBookmark.shortcutKey))
            })
          }
          onRemove={() =>
            closeAfter(async () => {
              await removeBookmark(editingBookmark)
              setShortcutMap(shortcutMap.set(editingBookmark.id, undefined))
            })
          }
        />
      </div>
      <div className="BookmarkEditor__Overlay" onClick={onRequestClose} />
    </div>,
    // put this modal into root to avoid side-effect of styles
    document.body
  )
}

export default BookmarkEditorComponent

type FormComponentProps = {
  bookmark: EditingBookmark
  errorMessage?: string
  onChange: (newValue: EditingBookmark) => void
  onRequestClose: () => void
  onSubmit: () => void
  onRemove: () => void
}

const FormComponent: FC<FormComponentProps> = ({
  bookmark,
  errorMessage,
  onChange,
  onSubmit,
  onRemove,
  onRequestClose,
}) => {
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
      <input
        type="text"
        value={bookmark.title}
        autoFocus={true}
        onChange={(e) => onChange({ ...bookmark, title: e.target.value })}
      />
      <input
        type="text"
        value={bookmark.url}
        className="BookmarkEditor__Url"
        style={{ backgroundImage: `url(${faviconImage(bookmark.url) ?? ''})` }}
        onChange={(e) => onChange({ ...bookmark, url: e.target.value })}
      />
      <input
        type="text"
        value={bookmark.shortcutKey ?? ''}
        maxLength={1}
        placeholder="Shortcut Key (not assigned)"
        onChange={(e) => onChange({ ...bookmark, shortcutKey: shortcutKeyOf(e.target.value) })}
      />
      <div className="BookmarkEditor__Group">
        <input type="submit" value="Update" />
        <div className="BookmarkEditor__Message">{errorMessage}</div>
        <input type="button" value="Remove" onClick={() => onRemove()} />
      </div>
    </form>
  )
}
