import React from 'react';
import './App.css';

import { BookmarkFolders } from './components/BookmarkFolders';
import { TopSites } from './components/TopSites';

function App() {
  return (
    <div className="App">
      <h2>TopSites</h2>
      <TopSites />
      <h2>Bookmarks</h2>
      <BookmarkFolders />
    </div>
  );
}

export default App;
