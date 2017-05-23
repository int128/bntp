import React, { PropTypes } from 'react';

import Link from '../../models/Link';

import './Tile.css';

export default class TileFolderItem extends React.Component {
  static propTypes = {
    link: PropTypes.instanceOf(Link).isRequired,
    canEdit: PropTypes.bool.isRequired,
    editClick: PropTypes.func.isRequired,
  }

  onLinkClick(e) {
    const { link } = this.props;
    if (link.isSpecial()) {
      window.chrome.tabs.create({url: link.url});
      e.preventDefault();
    } else if (link.isApp()) {
      window.chrome.management.launchApp(link.url);
      e.preventDefault();
    }
  }

  onEditClick(e) {
    const { editClick } = this.props;
    editClick(e);
  }

  render() {
    const { link, canEdit, children } = this.props;
    return (
      <div className="TileFolderItem">
        <a href={link.url} onClick={e => this.onLinkClick(e)}>
          <div className="TileFolderItem__Button">
            <div className="TileFolderItem__ButtonBody"
              style={{backgroundImage: `url(${link.getIcon()})`}}>
              {children}
            </div>
          </div>
        </a>
        {canEdit ?
          <div className="TileFolderItem__EditButton">
            <button onClick={e => this.onEditClick(e)}>Edit</button>
          </div>
        : null}
      </div>
    );
  }
}
