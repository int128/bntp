import React from 'react';
import './App.css';

import { BookmarkFolders } from './components/BookmarkFolders';
import { Themes } from './components/Themes';
import { TopSites } from './components/TopSites';

export const App = () =>
  <div className="App">
    <TopSites />
    <BookmarkFolders />
    <Themes />
  </div>
