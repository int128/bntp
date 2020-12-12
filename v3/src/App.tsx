import React from 'react';
import './App.css';

import { BookmarkFolders } from './components/BookmarkFolders';
import { Themes } from './components/Themes';
import { TopSites } from './components/TopSites';

function App() {
  return (
    <div className="App">
      <TopSites />
      <BookmarkFolders />
      <Themes />
    </div>
  );
}

export default App;
