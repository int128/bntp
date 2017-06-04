import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Seq } from 'immutable';

import FoldersContainer from './FoldersContainer';

import * as actionCreators from '../../state/bookmarks/actionCreators';

class BookmarkFoldersContainer extends React.Component {
  static propTypes = {
    bookmarkFolders: PropTypes.instanceOf(Seq).isRequired,
  }

  componentWillMount() {
    this.props.dispatch(actionCreators.subscribe());
  }

  componentWillUnmount() {
    this.props.dispatch(actionCreators.unsubscribe());
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

export default connect(mapStateToProps)(BookmarkFoldersContainer);
