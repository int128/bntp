import React, { PropTypes } from 'react';

import './Tile.css';

export class TileFolder extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    collapsed: PropTypes.bool,
    onToggle: PropTypes.func.isRequired
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
    } else {
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
    }
  }
}

export class TileFolderItem extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  }

  onClick(e) {
    const { url } = this.props;
    if (url.match(/^(chrome|file|javascript):/)) {
      window.chrome.tabs.create({url: url});
      e.preventDefault();
    } else if (url.match(/^app:/)) {
      window.chrome.management.launchApp(url.substring('app:'.length));
      e.preventDefault();
    }
  }

  render() {
    const { url, icon, children } = this.props;
    return (
      <div className="TileFolderItem">
        <a href={url} onClick={e => this.onClick(e)}>
          <div className="TileFolderItem__Button">
            <div className="TileFolderItem__ButtonBody"
              style={{backgroundImage: `url(${icon})`}}>
              {children}
            </div>
          </div>
        </a>
      </div>
    );
  }
}
