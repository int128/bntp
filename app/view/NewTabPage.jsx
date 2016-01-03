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
      showTopSites: Preferences.get('showTopSites', true),
      showBookmarks: Preferences.get('showBookmarks', true)
    };
  }
  onChange(state) {
    this.setState(state);
    Preferences.save(state);
  }
  render() {
    return (
      <div>
        <NetworkStatus />
        {this.state.showTopSites ? (<TopSites />) : null}
        {this.state.showBookmarks ? (<Bookmarks />) : null}
        <section className="Preferences">
          <PrefsThemes/>
          <PrefsVisibility
            showTopSites={this.state.showTopSites}
            showBookmarks={this.state.showBookmarks}
            showTopSitesOnChange={(v) => this.onChange({showTopSites: v})}
            showBookmarksOnChange={(v) => this.onChange({showBookmarks: v})}
            />
        </section>
        <Footer />
      </div>
    );
  }
}
