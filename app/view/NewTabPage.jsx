import React from 'react';

import NetworkStatus from './NetworkStatus.jsx';
import TopSites from './TopSites.jsx';
import Bookmarks from './Bookmarks.jsx';
import Preferences from './Preferences.jsx';
import Footer from './Footer.jsx';

export default class extends React.Component {
  render() {
    return (
      <div>
        <NetworkStatus />
        <TopSites />
        <Bookmarks />
        <Preferences />
        <Footer />
      </div>
    );
  }
}
