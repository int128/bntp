import { FC, useEffect, useState } from 'react'
import {
  Bookmark,
  BookmarkFolder,
  BookmarkFolderPreference,
  collapseBookmarkFolder,
  expandBookmarkFolder,
} from './model'
import { subscribeBookmarks } from './repository'

import './component.css'

export const BookmarkFolders: FC = () => {
  const bookmarkFolders = useBookmarkFolders()
  const [preference, setPreference] = useLocalStorage<BookmarkFolderPreference>('v3.bookmarkFolderPreference', {
    collapsedIDs: [],
  })
  return (
    <div className="Bookmarks">
      {bookmarkFolders.map((f, i) => (
        <BookmarkFolderComponent
          key={i}
          folder={f}
          collapsed={preference.collapsedIDs.includes(f.id)}
          onExpand={() => setPreference(expandBookmarkFolder(preference, f.id))}
          onCollapse={() => setPreference(collapseBookmarkFolder(preference, f.id))}
        />
      ))}
    </div>
  )
}

type BookmarkFolderComponentProps = {
  folder: BookmarkFolder
  collapsed: boolean
  onCollapse: () => void
  onExpand: () => void
}

const BookmarkFolderComponent: FC<BookmarkFolderComponentProps> = ({ folder, collapsed, onCollapse, onExpand }) => {
  if (collapsed) {
    return (
      <section className="BookmarkFolder">
        <div className="BookmarkFolder__Heading BookmarkFolder__Heading__Collapsed">
          <a
            href="#Expand"
            onClick={(e) => {
              onExpand()
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
            onCollapse()
            e.preventDefault()
          }}
        >
          <span className="BookmarkFolder__HeadingText">{folder.title}</span>
        </a>
      </div>
      {folder.bookmarks.map((b, i) => (
        <BookmarkComponent key={i} bookmark={b} />
      ))}
    </section>
  )
}

type BookmarkComponentProps = {
  bookmark: Bookmark
}

const BookmarkComponent: FC<BookmarkComponentProps> = ({ bookmark }) => {
  const favicon = `chrome://favicon/${bookmark.url}`
  return (
    <div className="Bookmark">
      <a href={bookmark.url}>
        <div className="Bookmark__Button">
          {
            //<div className="Bookmark__ButtonBadge">A</div>
          }
          <div className="Bookmark__ButtonBody" style={{ backgroundImage: `url(${favicon})` }}>
            {bookmark.title}
          </div>
        </div>
      </a>
      <div className="Bookmark__EditButton">
        <a href="#edit">&hellip;</a>
      </div>
    </div>
  )
}

function useBookmarkFolders() {
  const [bookmarkFolders, setBookmarkFolders] = useState<BookmarkFolder[]>([])
  useEffect(() => {
    const subscription = subscribeBookmarks((bookmarkFolders) => {
      setBookmarkFolders(bookmarkFolders)
    })
    subscription.refresh()
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  return bookmarkFolders
}

function useLocalStorage<T>(localStorageKey: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const value = localStorage.getItem(localStorageKey)
    if (value === null) {
      return initialValue
    }
    try {
      return JSON.parse(value) as T
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    function handleStorageEvent(e: StorageEvent) {
      if (e.storageArea === localStorage && e.key === localStorageKey && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue) as T)
        } catch {
          setStoredValue(initialValue)
        }
      }
    }
    window.addEventListener('storage', handleStorageEvent)
    return () => {
      window.removeEventListener('storage', handleStorageEvent)
    }
  }, [setStoredValue, localStorageKey, initialValue])

  return [
    storedValue,
    (value: T) => {
      setStoredValue(value)
      localStorage.setItem(localStorageKey, JSON.stringify(value))
    },
  ]
}
