import React from 'react';
import './App.css';

import { BookmarkFolders } from './Bookmarks/component';
import { Themes } from './Themes/component';
import { TopSites } from './TopSites/component';

export const App = () =>
  <div className="App">
    <TopSites />
    <BookmarkFolders />
    <Themes />
  </div>
