import React from 'react';
import './App.css';

import { BookmarkFolders } from './components/BookmarkFolders';
import { Themes } from './components/Themes';
import { TopSites } from './components/TopSites';

function App() {
  return (
    <div className="App">
      <h2>TopSites</h2>
      <TopSites />
      <h2>Bookmarks</h2>
      <BookmarkFolders />
      <h2>Preferences</h2>
      <Themes />
    </div>
  );
}

export default App;
