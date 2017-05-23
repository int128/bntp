import React from 'react';
import PropTypes from 'prop-types';

import FloatTip from './FloatTip';

import './Tile.css';

export default class TileFolder extends React.Component {
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
