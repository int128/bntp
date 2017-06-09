import React from 'react';
import PropTypes from 'prop-types';

import './Tile.css';

export default class TileFolderItem extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    badge: PropTypes.string,
    canEdit: PropTypes.bool.isRequired,
    onLinkClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
  }

  onEditClick(e) {
    this.props.onEditClick();
  }

  onLinkClick(e) {
    e.preventDefault();
    this.props.onLinkClick();
  }

  render() {
    const { url, icon, badge, canEdit, children } = this.props;
    return (
      <div className="TileFolderItem">
        <a href={url} onClick={e => this.onLinkClick(e)}>
          <div className="TileFolderItem__Button">
            {badge ?
              <div className="TileFolderItem__ButtonBadge">{badge}</div>
            : null}
            <div className="TileFolderItem__ButtonBody"
              style={{backgroundImage: `url(${icon})`}}>
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
