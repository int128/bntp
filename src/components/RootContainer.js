import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BookmarkFoldersContainer from './folders/BookmarkFoldersContainer';
import ChromeAppFoldersContainer from './folders/ChromeAppFoldersContainer';
import ChromePageFoldersContainer from './folders/ChromePageFoldersContainer';
import FolderItemEditorContainer from './folders/FolderItemEditorContainer';
import TopSitesContainer from './folders/TopSitesContainer';

import NetworkStatusContainer from './notifications/NetworkStatusContainer';
import Preferences from './preferences/Preferences';

import AppPreference from '../models/AppPreference';

class RootContainer extends React.Component {
  static propTypes = {
    appPreference: PropTypes.instanceOf(AppPreference).isRequired,
  }

  render() {
    const { appPreference } = this.props;
    return (
      <div>
        <NetworkStatusContainer />
        <FolderItemEditorContainer />
        {appPreference.showTopSites ? <TopSitesContainer/> : null}
        {appPreference.showBookmarks ? (
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
  appPreference: state.appPreference,
});

export default connect(mapStateToProps)(RootContainer);
