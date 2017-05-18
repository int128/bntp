import React, { PropTypes } from 'react';

import { Bookmark, Link } from '../models';

import './BookmarkForm.css';

export class BookmarkEditorForm extends React.Component {
  static propTypes = {
    bookmark: PropTypes.instanceOf(Bookmark).isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(new Bookmark({
      id: this.props.bookmark.id,
      title: this.refs.title.value,
      link: new Link({url: this.refs.url.value}),
    }));
  }

  onWrapClick(e) {
    e.preventDefault();
    this.props.onCancel();
  }

  render() {
    const { bookmark } = this.props;
    return (
      <div className="BookmarkEditorForm__Wrap" onClick={e => this.onWrapClick(e)}>
        <form className="BookmarkEditorForm" onClick={e => e.stopPropagation()} onSubmit={e => this.onSubmit(e)}>
          <div><input type="text" ref="title" defaultValue={bookmark.title} /></div>
          <div><input type="text" ref="url" defaultValue={bookmark.link.url} /></div>
          <div><input type="submit" value="Update" /></div>
        </form>
      </div>
    );
  }
}
