import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RootThemeContainer from './RootThemeContainer';

import BookmarkFoldersContainer from './folders/BookmarkFoldersContainer';
import ChromeAppFoldersContainer from './folders/ChromeAppFoldersContainer';
import ChromePageFoldersContainer from './folders/ChromePageFoldersContainer';
import FolderItemEditorContainer from './folders/FolderItemEditorContainer';
import TopSitesContainer from './folders/TopSitesContainer';

import NetworkStatusContainer from './notifications/NetworkStatusContainer';
import Preferences from './preferences/Preferences';

class RootContainer extends React.Component {
  static propTypes = {
    showBookmarks: PropTypes.bool.isRequired,
    showTopSites: PropTypes.bool.isRequired,
  }

  render() {
    const { showBookmarks, showTopSites } = this.props;
    return (
      <div>
        <RootThemeContainer />
        <NetworkStatusContainer />
        <FolderItemEditorContainer />
        {showTopSites ? <TopSitesContainer/> : null}
        {showBookmarks ? (
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
  showBookmarks: state.appPreference.showBookmarks,
  showTopSites: state.appPreference.showTopSites,
});

export default connect(mapStateToProps)(RootContainer);
