import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { BookmarkEditorForm } from '../components/BookmarkForm';

import {
  changeBookmarkEdit,
  saveBookmarkEdit,
  removeBookmarkEdit,
  cancelBookmarkEdit,
} from '../actions';

import { Bookmark } from '../models';

class BookmarkEditor extends React.Component {
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
          onChange={bookmark => dispatch(changeBookmarkEdit(bookmark))}
          onSubmit={bookmark => dispatch(saveBookmarkEdit(bookmark))}
          onRemove={bookmark => dispatch(removeBookmarkEdit(bookmark))}
          onCancel={bookmark => dispatch(cancelBookmarkEdit())}/>
      );
    }
  }
}

const mapStateToProps = state => ({
  editingBookmark: state.editingBookmark,
});

export default connect(mapStateToProps)(BookmarkEditor);
