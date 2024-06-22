import './component.css'
import { FC, useContext, useEffect, useState } from 'react'
import { removeBookmark, updateBookmark } from '../Bookmarks/repository'
import DialogComponent from '../Dialog/component'
import { EditingBookmark } from './model'
import { FaviconContext } from '../infrastructure/favicon'
import LinkComponent from '../Link/component'
import { shortcutKeyOf } from '../ShortcutKey/model'
import { useShortcutMap } from '../ShortcutKey/repository'

type BookmarkEditorComponentProps = {
  editingBookmark?: EditingBookmark
  onChange: (newValue: EditingBookmark) => void
  onRequestClose: () => void
}

const BookmarkEditorComponent: FC<BookmarkEditorComponentProps> = ({ editingBookmark, onChange, onRequestClose }) => {
  const [errorMessage, setErrorMessage] = useState<string>()
  const [shortcutMap, setShortcutMap] = useShortcutMap()
  useEffect(
    // Remove errorMessage when editingBookmark is changed
    () => setErrorMessage(undefined),
    [editingBookmark],
  )
  if (editingBookmark === undefined) {
    return null
  }
  const closeAfter = (f: () => Promise<void>) =>
    void f()
      .then(onRequestClose)
      .catch((e) => setErrorMessage(String(e)))
  return (
    <div className="BookmarkEditor">
      <DialogComponent open={true} onRequestClose={onRequestClose}>
        <FormComponent
          editingBookmark={editingBookmark}
          errorMessage={errorMessage}
          onChange={onChange}
          onRequestClose={onRequestClose}
          onSubmit={() =>
            closeAfter(async () => {
              await updateBookmark(editingBookmark.bookmark)
              setShortcutMap(shortcutMap.set(editingBookmark.bookmark.id, editingBookmark.shortcutKey))
            })
          }
          onRemove={() =>
            closeAfter(async () => {
              await removeBookmark(editingBookmark.bookmark)
              setShortcutMap(shortcutMap.set(editingBookmark.bookmark.id, undefined))
            })
          }
        />
      </DialogComponent>
    </div>
  )
}

export default BookmarkEditorComponent

type FormComponentProps = {
  editingBookmark: EditingBookmark
  errorMessage?: string
  onChange: (newValue: EditingBookmark) => void
  onRequestClose: () => void
  onSubmit: () => void
  onRemove: () => void
}

const FormComponent: FC<FormComponentProps> = ({ editingBookmark, errorMessage, onChange, onSubmit, onRemove }) => {
  const favicon = useContext(FaviconContext)
  return (
    <form
      className="BookmarkEditor__Form"
      onSubmit={(e) => {
        onSubmit()
        e.preventDefault()
      }}
    >
      <input
        type="text"
        value={editingBookmark.bookmark.title}
        required={true}
        autoFocus={true}
        onChange={(e) =>
          onChange(editingBookmark.changeBookmark({ ...editingBookmark.bookmark, title: e.target.value }))
        }
      />
      <input
        type="text"
        value={editingBookmark.bookmark.url}
        required={true}
        className="BookmarkEditor__Url"
        style={{ backgroundImage: `url(${favicon.getImageUrl(editingBookmark.bookmark.url) ?? ''})` }}
        onChange={(e) => onChange(editingBookmark.changeBookmark({ ...editingBookmark.bookmark, url: e.target.value }))}
      />
      <input
        type="text"
        value={editingBookmark.shortcutKey ?? ''}
        maxLength={1}
        placeholder="Shortcut Key (not assigned)"
        onChange={(e) => onChange(editingBookmark.changeShortcutKey(shortcutKeyOf(e.target.value)))}
      />
      <LinkComponent href={`chrome://bookmarks/?id=${editingBookmark.bookmark.folderID}`}>
        Open this in Chrome Bookmark Manager
      </LinkComponent>
      <div className="BookmarkEditor__Group">
        <input type="submit" value="Update" disabled={!editingBookmark.valid} />
        <div className="BookmarkEditor__Message">{errorMessage}</div>
        <input type="button" value="Remove" onClick={() => onRemove()} />
      </div>
    </form>
  )
}
