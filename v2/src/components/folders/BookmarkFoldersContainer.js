import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Seq } from 'immutable';

import FolderContainer from './FolderContainer';

class BookmarkFoldersContainer extends React.Component {
  static propTypes = {
    bookmarkFolders: PropTypes.instanceOf(Seq).isRequired,
  }

  render() {
    const { bookmarkFolders } = this.props;
    return (
      <div>
        {bookmarkFolders.map(folder => <FolderContainer key={folder.id} folder={folder}/>)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bookmarkFolders: state.bookmarkFolders,
});

export default connect(mapStateToProps)(BookmarkFoldersContainer);
