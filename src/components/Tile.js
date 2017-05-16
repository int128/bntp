import React, { PropTypes } from 'react';

import { FloatTip } from '../components/Tip';
import { Link } from '../models';

import './Tile.css';

export class TileFolder extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    collapsed: PropTypes.bool,
    onToggle: PropTypes.func,
  }

  onClick(e, collapsed) {
    this.props.onToggle(!this.props.collapsed);
    e.preventDefault();
  }

  render() {
    const { title, collapsed, children } = this.props;
    if (collapsed === true) {
      return (
        <section className="TileFolder">
          <FloatTip title="Expand">
            <div className="TileFolder__Heading TileFolder__Heading__Collapse">
              <a href="#" onClick={e => this.onClick(e)}>
                <span className="TileFolder__HeadingText">{title}</span>
              </a>
            </div>
          </FloatTip>
        </section>
      );
    } else if (collapsed === false) {
      return (
        <section className="TileFolder">
          <div className="TileFolder__Heading TileFolder__Heading__Expand">
            <FloatTip title="Collapse">
              <a href="#" onClick={e => this.onClick(e)}>
                <span className="TileFolder__HeadingText">{title}</span>
              </a>
            </FloatTip>
          </div>
          {children}
        </section>
      );
    } else {
      return (
        <section className="TileFolder">
          <div className="TileFolder__Heading TileFolder__Heading__Expand">
            {title}
          </div>
          {children}
        </section>
      );
    }
  }
}

export class TileFolderItem extends React.Component {
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
