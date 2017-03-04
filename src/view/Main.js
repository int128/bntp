import React from 'react';

import NetworkStatus from './NetworkStatus.js';
import Footer from './Footer.js';

import TopSites from './TopSites.js';
import Apps from './Apps.js';
import Bookmarks from './Bookmarks.js';
import PrefsThemes from './PrefsThemes.js';
import PrefsVisibility from './PrefsVisibility.js';

import Preferences from '../repository/Preferences.js';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showTopSites: true, showBookmarks: true, showApps: true};
  }
  componentDidMount() {
    this.setState(Preferences.get('showTopSites', 'showBookmarks', 'showApps'));
  }
  onChange(state) {
    this.setState(state);
    Preferences.save(state);
  }
  render() {
    return (
      <div>
        <NetworkStatus/>
        {this.state.showTopSites ? (<TopSites />) : null}
        {this.state.showBookmarks ? (<Bookmarks />) : null}
        {this.state.showApps ? (<Apps />) : null}
        <section className="Preferences">
          <PrefsThemes/>
          <PrefsVisibility
            showTopSites={this.state.showTopSites}
            showBookmarks={this.state.showBookmarks}
            showApps={this.state.showApps}
            showTopSitesOnChange={v => this.onChange({showTopSites: v})}
            showBookmarksOnChange={v => this.onChange({showBookmarks: v})}
            showAppsOnChange={v => this.onChange({showApps: v})}
            />
        </section>
        <Footer/>
      </div>
    );
  }
}
