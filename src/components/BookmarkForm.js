import React, { PropTypes } from 'react';

import { Bookmark } from '../models';

import './BookmarkForm.css';

export class BookmarkEditorForm extends React.Component {
  static propTypes = {
    bookmark: PropTypes.instanceOf(Bookmark).isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  }

  onSubmitClick(e) {
    this.props.onSubmit();
  }

  onCancelClick() {
    this.props.onCancel();
  }

  onWrapClick(e) {
    this.props.onCancel();
    e.preventDefault();
  }

  render() {
    const { bookmark } = this.props;
    return (
      <div className="BookmarkEditorForm__Wrap" onClick={e => this.onWrapClick(e)}>
        <form className="BookmarkEditorForm" onClick={e => e.stopPropagation()}>
          <div>Bookmark #{bookmark.id}</div>
          <div><input type="text" defaultValue={bookmark.title} /></div>
          <div><input type="text" defaultValue={bookmark.link.url} /></div>
          <div>
            <input type="submit" onClick={e => this.onSubmitClick(e)} value="Update" />
            <input type="reset" onClick={e => this.onCancelClick(e)} value="Cancel" />
          </div>
        </form>
      </div>
    );
  }
}
