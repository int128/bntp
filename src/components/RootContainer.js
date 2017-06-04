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

import Visibilities from '../models/Visibilities';

class RootContainer extends React.Component {
  static propTypes = {
    visibilities: PropTypes.instanceOf(Visibilities).isRequired,
  }

  render() {
    const { visibilities } = this.props;
    return (
      <div>
        <NetworkStatusContainer />
        <FolderItemEditorContainer />
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
