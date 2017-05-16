import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Seq } from 'immutable';

import Bookmarks from './Bookmarks';
import TopSites from './TopSites';
import NetworkStatus from './NetworkStatus';
import BookmarkEditor from './BookmarkEditor';
import Preferences from '../components/Preferences';

import { Visibilities } from '../models';

class App extends React.Component {
  static propTypes = {
    visibilities: PropTypes.instanceOf(Visibilities).isRequired,
    bookmarkFolders: PropTypes.instanceOf(Seq).isRequired,
    chromePageFolders: PropTypes.instanceOf(Seq).isRequired,
  }

  render() {
    const { visibilities, bookmarkFolders, chromePageFolders, chromeAppFolders } = this.props;
    return (
      <div>
        <NetworkStatus />
        <BookmarkEditor />
        {visibilities.isVisible('top-sites') ? <TopSites/> : null}
        {visibilities.isVisible('bookmarks') ? (
          <div>
            <Bookmarks folders={bookmarkFolders} />
            <Bookmarks folders={chromePageFolders} />
            <Bookmarks folders={chromeAppFolders} />
          </div>
        ) : null}
        <Preferences />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  visibilities: state.visibilities,
  bookmarkFolders: state.bookmarkFolders,
  chromePageFolders: state.chromePageFolders,
  chromeAppFolders: state.chromeAppFolders,
});

export default connect(mapStateToProps)(App);
