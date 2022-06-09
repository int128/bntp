import React from 'react'
import './App.css'

import { BookmarkFolders } from './Bookmarks/component'
import { Preferences } from './Preferences/component'
import { TopSites } from './TopSites/component'

export const App = () => (
  <div className="App">
    <TopSites />
    <BookmarkFolders />
    <Preferences />
  </div>
)
