import React from 'react';

import NetworkStatus from './NetworkStatus.js';
import Footer from './Footer.js';

import Togglable from './Togglable.js';
import TopSites from './TopSites.js';
import Apps from './Apps.js';
import Bookmarks from './Bookmarks.js';
import Preferences from './Preferences.js';

import './Main.css';

export default class extends React.Component {
  render() {
    return (
      <div className="Main">
        <NetworkStatus/>
        <Togglable name="TopSites">
          <TopSites />
        </Togglable>
        <Togglable name="Bookmarks">
          <Bookmarks />
        </Togglable>
        <Togglable name="Apps">
          <Apps />
        </Togglable>
        <Preferences />
        <Footer/>
      </div>
    );
  }
}
