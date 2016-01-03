import React from 'react';

import NetworkStatus from './NetworkStatus.jsx';
import TopSites from './TopSites.jsx';
import Bookmarks from './Bookmarks.jsx';
import Preferences from './Preferences.jsx';
import Footer from './Footer.jsx';

import PreferencesRepository from '../repository/Preferences.jsx';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTopSites: PreferencesRepository.get('showTopSites', true),
      showBookmarks: PreferencesRepository.get('showBookmarks', true)
    };
  }
  onChangeComponentVisibility(name, visibility) {
    const state = {};
    state[name] = visibility;
    this.setState(state);
    PreferencesRepository.set(name, visibility);
  }
  render() {
    return (
      <div>
        <NetworkStatus />
        {this.state.showTopSites ? (<TopSites />) : null}
        {this.state.showBookmarks ? (<Bookmarks />) : null}
        <Preferences
          showTopSites={this.state.showTopSites}
          showBookmarks={this.state.showBookmarks}
          onChangeComponentVisibility={this.onChangeComponentVisibility.bind(this)}
          />
        <Footer />
      </div>
    );
  }
}
