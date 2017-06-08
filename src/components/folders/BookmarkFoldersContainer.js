import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Seq } from 'immutable';

import FoldersContainer from './FoldersContainer';

import connectToEventListener from '../../state/bookmarks/connectToEventListener';

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

export default connect(mapStateToProps)(connectToEventListener(BookmarkFoldersContainer));
