import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Seq } from 'immutable';

import { BookmarkEditorForm } from '../components/BookmarkForm';

import { commitBookmarkEdit, cancelBookmarkEdit } from '../actions';

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
          onSubmit={bookmark => dispatch(commitBookmarkEdit(bookmark))}
          onCancel={e => dispatch(cancelBookmarkEdit())}/>
      );
    }
  }
}

const mapStateToProps = state => ({
  editingBookmark: state.editingBookmark,
});

export default connect(mapStateToProps)(BookmarkEditor);
