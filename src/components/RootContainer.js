import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Seq } from 'immutable';

import BookmarksContainer from './bookmarks/BookmarksContainer';
import BookmarkEditorContainer from './bookmarks/BookmarkEditorContainer';
import TopSitesContainer from './topsites/TopSitesContainer';
import NetworkStatusContainer from './notifications/NetworkStatusContainer';
import Preferences from './preferences/Preferences';

import Visibilities from '../models/preferences/Visibilities';

class RootContainer extends React.Component {
  static propTypes = {
    visibilities: PropTypes.instanceOf(Visibilities).isRequired,
    bookmarkFolders: PropTypes.instanceOf(Seq).isRequired,
    chromePageFolders: PropTypes.instanceOf(Seq).isRequired,
  }

  render() {
    const { visibilities, bookmarkFolders, chromePageFolders, chromeAppFolders } = this.props;
    return (
      <div>
        <NetworkStatusContainer />
        <BookmarkEditorContainer />
        {visibilities.isVisible('top-sites') ? <TopSitesContainer/> : null}
        {visibilities.isVisible('bookmarks') ? (
          <div>
            <BookmarksContainer folders={bookmarkFolders} />
            <BookmarksContainer folders={chromePageFolders} />
            <BookmarksContainer folders={chromeAppFolders} />
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

export default connect(mapStateToProps)(RootContainer);
