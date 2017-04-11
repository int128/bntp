import React, { PropTypes } from 'react';

import { Link } from '../models';

import './Tile.css';

export class TileFolder extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    collapsed: PropTypes.bool,
    onToggle: PropTypes.func,
  }

  onClick(e, collapsed) {
    this.props.onToggle(collapsed);
    e.preventDefault();
  }

  render() {
    const { title, collapsed, children } = this.props;
    if (collapsed === true) {
      return (
        <section className="TileFolder">
          <div className="TileFolder__Heading TileFolder__Heading__Collapse">
            <a href="click: Expand this folder" onClick={e => this.onClick(e, !collapsed)}>
              {title}
            </a>
          </div>
        </section>
      );
    } else if (collapsed === false) {
      return (
        <section className="TileFolder">
          <div className="TileFolder__Heading TileFolder__Heading__Expand">
            <a href="click: Collapse this folder" onClick={e => this.onClick(e, !collapsed)}>
              {title}
            </a>
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
  }

  onClick(e) {
    const { link } = this.props;
    if (link.isSpecial()) {
      window.chrome.tabs.create({url: link.url});
      e.preventDefault();
    } else if (link.isApp()) {
      window.chrome.management.launchApp(link.url);
      e.preventDefault();
    }
  }

  render() {
    const { link, children } = this.props;
    return (
      <div className="TileFolderItem">
        <a href={link.url} onClick={e => this.onClick(e)}>
          <div className="TileFolderItem__Button">
            <div className="TileFolderItem__ButtonBody"
              style={{backgroundImage: `url(${link.getIcon()})`}}>
              {children}
            </div>
          </div>
        </a>
      </div>
    );
  }
}
