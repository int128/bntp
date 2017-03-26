import React from 'react';

import Bookmarks from '../containers/Bookmarks';
import Apps from '../containers/Apps';
import TopSites from '../containers/TopSites';

const App = () => (
  <div>
    <TopSites />
    <Bookmarks />
    <Apps />
  </div>
);

export default App;
