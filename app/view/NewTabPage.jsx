import React from 'react';

import NetworkStatus from './NetworkStatus.jsx';
import TopSites from './TopSites.jsx';
import Bookmarks from './Bookmarks.jsx';
import PrefsThemes from './PrefsThemes.jsx';
import PrefsVisibility from './PrefsVisibility.jsx';
import Footer from './Footer.jsx';

import Preferences from '../repository/Preferences.jsx';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      themeName: Preferences.getThemeName(),
      showTopSites: Preferences.get('showTopSites', true),
      showBookmarks: Preferences.get('showBookmarks', true)
    };
  }
  onChangeTheme(themeName) {
    Preferences.setThemeName(themeName);
  }
  onChangeVisibility(name, visibility) {
    const state = {};
    state[name] = visibility;
    this.setState(state);
    Preferences.set(name, visibility);
  }
  render() {
    return (
      <div>
        <NetworkStatus />
        {this.state.showTopSites ? (<TopSites />) : null}
        {this.state.showBookmarks ? (<Bookmarks />) : null}
        <section className="Preferences">
          <PrefsThemes
            themeName={this.state.themeName}
            onChange={this.onChangeTheme.bind(this)}
            />
          <PrefsVisibility
            showTopSites={this.state.showTopSites}
            showBookmarks={this.state.showBookmarks}
            onChange={this.onChangeVisibility.bind(this)}
            />
        </section>
        <Footer />
      </div>
    );
  }
}
