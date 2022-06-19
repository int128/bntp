import { useState } from 'react'
import './App.css'

import Bookmarks from './Bookmarks/component'
import BookmarkEditor from './BookmarkEditor/component'
import Preferences from './Preferences/component'
import { Toggles } from './Toggles/model'
import TopSites from './TopSites/component'
import { Bookmark } from './Bookmarks/model'

const App = () => {
  const [toggles, setToggles] = useState<Toggles>()
  const [editingBookmark, setEditingBookmark] = useState<Bookmark>()
  return (
    <div className="App">
      {toggles?.topSites ? <TopSites /> : null}
      {toggles?.bookmarks ? (
        <Bookmarks indent={toggles.indent} onEditClick={(bookmark) => setEditingBookmark(bookmark)} />
      ) : null}
      <Preferences onTogglesChange={setToggles} />
      <BookmarkEditor bookmark={editingBookmark} onRequestClose={() => setEditingBookmark(undefined)} />
    </div>
  )
}

export default App
