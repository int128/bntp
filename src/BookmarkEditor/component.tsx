import './component.css'
import { FC, useContext, useEffect, useState } from 'react'
import { ShortcutKey, shortcutKeyOf } from '../ShortcutKey/model'
import { removeBookmark, updateBookmark } from '../Bookmarks/repository'
import { Bookmark } from '../Bookmarks/model'
import DialogComponent from '../Dialog/component'
import { FaviconContext } from '../infrastructure/favicon'
import LinkComponent from '../Link/component'
import { isValidEditingBookmark } from './model'
import { useShortcutMap } from '../ShortcutKey/repository'

type BookmarkEditorComponentProps = {
  open: boolean
  bookmark: Bookmark
  shortcutKey: ShortcutKey | undefined
  onRequestClose: () => void
}

const BookmarkEditorComponent: FC<BookmarkEditorComponentProps> = ({ open, bookmark, shortcutKey, onRequestClose }) => {
  const [editingBookmark, setEditingBookmark] = useState(bookmark)
  const [editingShortcutKey, setEditingShortcutKey] = useState(shortcutKey)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [shortcutMap, setShortcutMap] = useShortcutMap()

  // Reset the state when the dialog is opened
  useEffect(() => {
    setEditingBookmark(bookmark)
    setEditingShortcutKey(shortcutKey)
    setErrorMessage(undefined)
  }, [open])

  // Reflect when it is updated in another tab
  useEffect(() => {
    setEditingBookmark(bookmark)
  }, [bookmark])
  useEffect(() => {
    setEditingShortcutKey(shortcutKey)
  }, [shortcutKey])

  const closeAfter = (f: () => Promise<void>) =>
    void f()
      .then(onRequestClose)
      .catch((e) => setErrorMessage(String(e)))
  return (
    <DialogComponent className="BookmarkEditor" open={open} onRequestClose={onRequestClose}>
      <FormComponent
        editingBookmark={editingBookmark}
        editingShortcutKey={editingShortcutKey}
        setEditingBookmark={setEditingBookmark}
        setEditingShortcutKey={setEditingShortcutKey}
        errorMessage={errorMessage}
        onRequestClose={onRequestClose}
        onSubmit={() =>
          closeAfter(async () => {
            await updateBookmark(editingBookmark)
            setShortcutMap(shortcutMap.set(editingBookmark.id, shortcutKey))
          })
        }
        onRemove={() =>
          closeAfter(async () => {
            await removeBookmark(editingBookmark)
            setShortcutMap(shortcutMap.set(editingBookmark.id, undefined))
          })
        }
      />
    </DialogComponent>
  )
}

export default BookmarkEditorComponent

type FormComponentProps = {
  editingBookmark: Bookmark
  editingShortcutKey: ShortcutKey | undefined
  setEditingBookmark: React.Dispatch<Bookmark>
  setEditingShortcutKey: React.Dispatch<ShortcutKey | undefined>
  errorMessage: string | undefined
  onRequestClose: () => void
  onSubmit: () => void
  onRemove: () => void
}

const FormComponent: FC<FormComponentProps> = ({
  editingBookmark,
  editingShortcutKey,
  setEditingBookmark,
  setEditingShortcutKey,
  errorMessage,
  onSubmit,
  onRemove,
}) => {
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
        value={editingBookmark.title}
        required={true}
        autoFocus={true}
        onChange={(e) => setEditingBookmark({ ...editingBookmark, title: e.target.value })}
      />
      <input
        type="text"
        value={editingBookmark.url}
        required={true}
        className="BookmarkEditor__Url"
        style={{ backgroundImage: `url(${favicon.getImageUrl(editingBookmark.url) ?? ''})` }}
        onChange={(e) => setEditingBookmark({ ...editingBookmark, url: e.target.value })}
      />
      <input
        type="text"
        value={editingShortcutKey ?? ''}
        maxLength={1}
        placeholder="Shortcut Key (not assigned)"
        onChange={(e) => setEditingShortcutKey(shortcutKeyOf(e.target.value))}
      />
      <LinkComponent href={`chrome://bookmarks/?id=${editingBookmark.folderID}`}>
        Open this in Chrome Bookmark Manager
      </LinkComponent>
      <div className="BookmarkEditor__Group">
        <input type="submit" value="Update" disabled={!isValidEditingBookmark(editingBookmark)} />
        <div className="BookmarkEditor__Message">{errorMessage}</div>
        <input type="button" value="Remove" onClick={() => onRemove()} />
      </div>
    </form>
  )
}
