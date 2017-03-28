import React from 'react';

import Bookmarks from '../containers/Bookmarks';
import Apps from '../containers/Apps';
import TopSites from '../containers/TopSites';
import Preferences from './Preferences';

const App = () => (
  <div>
    <TopSites />
    <Bookmarks />
    <Apps />
    <Preferences />
  </div>
);

export default App;
