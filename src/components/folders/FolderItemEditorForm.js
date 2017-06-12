import React from 'react';
import PropTypes from 'prop-types';

import Bookmark from '../../models/Bookmark';
import ChromeApp from '../../models/ChromeApp';
import ChromePage from '../../models/ChromePage';
import FolderItemPreference from '../../models/FolderItemPreference';

import './FolderItemEditorForm.css';

const FolderItemTypes = [
  PropTypes.instanceOf(Bookmark),
  PropTypes.instanceOf(ChromeApp),
  PropTypes.instanceOf(ChromePage),
];

export default class FolderItemEditorForm extends React.Component {
  static propTypes = {
    folderItem: PropTypes.oneOfType(FolderItemTypes).isRequired,
    folderItemPreference: PropTypes.instanceOf(FolderItemPreference).isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.refs.title.focus();
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.getEditingFolderItem(), this.getEditingFolderItemPreference());
  }

  onKeyDown(e) {
    if (e.key === 'Escape') {
      this.props.onCancel(this.getEditingFolderItem(), this.getEditingFolderItemPreference());
    }
  }

  onWrapClick(e) {
    e.preventDefault();
    this.props.onCancel(this.getEditingFolderItem(), this.getEditingFolderItemPreference());
  }

  onInputChange(e) {
    this.props.onChange(this.getEditingFolderItem(), this.getEditingFolderItemPreference());
  }

  onRemoveClick(e) {
    this.props.onRemove(this.getEditingFolderItem(), this.getEditingFolderItemPreference());
  }

  getEditingFolderItem() {
    return this.props.folderItem.merge({
      title: this.refs.title.value,
      url: this.refs.url.value,
    });
  }

  getEditingFolderItemPreference() {
    return this.props.folderItemPreference.merge({
      accessKey: this.refs.accessKey.value,
    });
  }

  render() {
    const { folderItem, folderItemPreference } = this.props;
    return (
      <div className="FolderItemEditorForm__Wrap" onClick={e => this.onWrapClick(e)}>
        <form className="FolderItemEditorForm"
          onClick={e => e.stopPropagation()}
          onSubmit={e => this.onSubmit(e)}
          onKeyDown={e => this.onKeyDown(e)}>
          <div>
            <input type="text" ref="title" defaultValue={folderItem.title}
              readOnly={folderItem.canEditTitle !== true}
              className="FolderItemEditorForm__TextInput"
              onChange={e => this.onInputChange(e)}/>
          </div>
          <div>
            <input type="text" ref="url" defaultValue={folderItem.url}
              readOnly={folderItem.canEditUrl !== true}
              className="FolderItemEditorForm__UrlInput"
              style={{backgroundImage: `url(${folderItem.icon})`}}
              onChange={e => this.onInputChange(e)}/>
          </div>
          <div>
            <input type="text" ref="accessKey" value={folderItemPreference.accessKey}
              maxLength={1}
              className="FolderItemEditorForm__TextInput"
              placeholder="Shortcut Key (not assigned)"
              onChange={e => this.onInputChange(e)}/>
          </div>
          <div>
            <input type="submit" value="Update"
              className="FolderItemEditorForm__Button FolderItemEditorForm__Left"/>
            <input type="button" value="Remove"
              className="FolderItemEditorForm__Button FolderItemEditorForm__Right"
              onClick={e => this.onRemoveClick(e)}/>
          </div>
          <div className="FolderItemEditorForm__ClearFix"></div>
        </form>
      </div>
    );
  }
}
