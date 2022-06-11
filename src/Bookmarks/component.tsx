import { FC, ReactElement, useEffect, useState } from 'react'
import {
  Bookmark,
  BookmarkFolder,
  BookmarkFolderPreference,
  collapseBookmarkFolder,
  expandBookmarkFolder,
} from './model'

import './component.css'
import { subscribeBookmarks } from './repository'
import { useLocalStorage } from '../infrastructure/localstorage'

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
      <Link href={bookmark.url}>
        <div className="Bookmark__Button">
          {
            //<div className="Bookmark__ButtonBadge">A</div>
          }
          <div className="Bookmark__ButtonBody" style={{ backgroundImage: `url(${favicon})` }}>
            {bookmark.title}
          </div>
        </div>
      </Link>
      <div className="Bookmark__EditButton">
        <a href="#edit">&hellip;</a>
      </div>
    </div>
  )
}

type LinkProps = {
  href: string
  children: ReactElement
}

const Link: FC<LinkProps> = ({ href, children }) => {
  // handle the special links
  if (href.match(/^(chrome|file|javascript):/)) {
    return (
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault()
          void chrome.tabs.create({ url: href })
        }}
      >
        {children}
      </a>
    )
  }
  return <a href={href}>{children}</a>
}

export const useBookmarkFolders = () => {
  const [bookmarkFolders, setBookmarkFolders] = useState<BookmarkFolder[]>([])
  useEffect(() => {
    const subscription = subscribeBookmarks((bookmarkFolders) => setBookmarkFolders(bookmarkFolders))
    subscription.refresh()
    return () => subscription.unsubscribe()
  }, [])
  return bookmarkFolders
}
