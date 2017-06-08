import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Seq } from 'immutable';

import FoldersContainer from './FoldersContainer';

import * as connectors from '../../state/folderItem/connectors';

class BookmarkFoldersContainer extends React.Component {
  static propTypes = {
    bookmarkFolders: PropTypes.instanceOf(Seq).isRequired,
  }

  render() {
    const { bookmarkFolders } = this.props;
    return (
      <FoldersContainer folders={bookmarkFolders}/>
    );
  }
}

const mapStateToProps = state => ({
  bookmarkFolders: state.bookmarkFolders,
});

export default connect(mapStateToProps)(connectors.bookmarks(BookmarkFoldersContainer));
