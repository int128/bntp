import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BookmarkFoldersContainer from './bookmarks/BookmarkFoldersContainer';
import ChromeAppFoldersContainer from './bookmarks/ChromeAppFoldersContainer';
import ChromePageFoldersContainer from './bookmarks/ChromePageFoldersContainer';
import BookmarkEditorContainer from './bookmarks/BookmarkEditorContainer';
import TopSitesContainer from './topsites/TopSitesContainer';
import NetworkStatusContainer from './notifications/NetworkStatusContainer';
import Preferences from './preferences/Preferences';

import Visibilities from '../models/preferences/Visibilities';

class RootContainer extends React.Component {
  static propTypes = {
    visibilities: PropTypes.instanceOf(Visibilities).isRequired,
  }

  render() {
    const { visibilities } = this.props;
    return (
      <div>
        <NetworkStatusContainer />
        <BookmarkEditorContainer />
        {visibilities.isVisible('top-sites') ? <TopSitesContainer/> : null}
        {visibilities.isVisible('bookmarks') ? (
          <div>
            <BookmarkFoldersContainer/>
            <ChromeAppFoldersContainer/>
            <ChromePageFoldersContainer/>
          </div>
        ) : null}
        <Preferences />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  visibilities: state.visibilities,
});

export default connect(mapStateToProps)(RootContainer);
