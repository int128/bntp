import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BookmarkEditorForm from './BookmarkEditorForm';

import * as actionCreators from '../../state/bookmarks/actionCreators';

import Bookmark from '../../models/Bookmark';

class BookmarkEditorContainer extends React.Component {
  static propTypes = {
    editingBookmark: PropTypes.instanceOf(Bookmark),
  }

  render() {
    const { dispatch, editingBookmark } = this.props;
    if (editingBookmark === null) {
      return null;
    } else {
      return (
        <BookmarkEditorForm
          bookmark={editingBookmark}
          onChange={bookmark => dispatch(actionCreators.changeBookmarkEdit(bookmark))}
          onSubmit={bookmark => dispatch(actionCreators.saveBookmarkEdit(bookmark))}
          onRemove={bookmark => dispatch(actionCreators.removeBookmarkEdit(bookmark))}
          onCancel={bookmark => dispatch(actionCreators.cancelBookmarkEdit())}/>
      );
    }
  }
}

const mapStateToProps = state => ({
  editingBookmark: state.editingBookmark,
});

export default connect(mapStateToProps)(BookmarkEditorContainer);
