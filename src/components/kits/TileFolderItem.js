import React from 'react';
import PropTypes from 'prop-types';

import Link from '../../models/Link';

import './Tile.css';

export default class TileFolderItem extends React.Component {
  static propTypes = {
    link: PropTypes.instanceOf(Link).isRequired,
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
    const { link, badge, canEdit, children } = this.props;
    return (
      <div className="TileFolderItem">
        <a href={link.url} onClick={e => this.onLinkClick(e)}>
          <div className="TileFolderItem__Button">
            {badge ?
              <div className="TileFolderItem__ButtonBadge">{badge}</div>
            : null}
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
