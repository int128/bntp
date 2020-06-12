import React from 'react';
import PropTypes from 'prop-types';

import Link from './Link';

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
    e.preventDefault();
    this.props.onEditClick();
  }

  render() {
    const { url, icon, badge, canEdit, onLinkClick, children } = this.props;
    return (
      <div className="TileFolderItem">
        <span className="Tooltip">{url}</span>
        <Link url={url} onClick={e => onLinkClick(e)}>
          <div className="TileFolderItem__Button">
            {badge ?
              <div className="TileFolderItem__ButtonBadge">{badge}</div>
            : null}
            <div className="TileFolderItem__ButtonBody"
              style={{backgroundImage: `url(${icon})`}}>
              {children}
            </div>
          </div>
        </Link>
        {canEdit ?
          <div className="TileFolderItem__EditButton">
            <a href="#edit" onClick={e => this.onEditClick(e)}>&hellip;</a>
          </div>
        : null}
      </div>
    );
  }
}
