import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Seq } from 'immutable';

import Bookmarks from './Bookmarks';
import Apps from './Apps';
import TopSites from './TopSites';
import NetworkStatus from './NetworkStatus';
import Preferences from '../components/Preferences';

import { Visibilities } from '../models';

class App extends React.Component {
  static propTypes = {
    visibilities: PropTypes.instanceOf(Visibilities).isRequired,
    bookmarkFolders: PropTypes.instanceOf(Seq).isRequired,
    chromePageFolders: PropTypes.instanceOf(Seq).isRequired,
  }

  render() {
    const { visibilities, bookmarkFolders, chromePageFolders } = this.props;
    return (
      <div>
        <NetworkStatus />
        {visibilities.isVisible('top-sites') ? <TopSites/> : null}
        {visibilities.isVisible('bookmarks') ? (
          <div>
            <Bookmarks folders={bookmarkFolders} />
            <Bookmarks folders={chromePageFolders} />
          </div>
        ) : null}
        {visibilities.isVisible('apps') ? <Apps/> : null}
        <Preferences />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  visibilities: state.visibilities,
  bookmarkFolders: state.bookmarkFolders,
  chromePageFolders: state.chromePageFolders,
});

export default connect(mapStateToProps)(App);
