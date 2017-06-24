import React from 'react';
import PropTypes from 'prop-types';

import FloatTip from './FloatTip';

import './Tile.css';

export default class TileFolder extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    indent: PropTypes.number.isRequired,
    collapsed: PropTypes.bool.isRequired,
    onToggleClick: PropTypes.func.isRequired,
  }

  onClick(e) {
    this.props.onToggleClick(!this.props.collapsed);
    e.preventDefault();
  }

  render() {
    const { title, indent, collapsed, children } = this.props;
    return (
      <div style={{marginLeft: indent * 80}}>
        <section className="TileFolder">
          {collapsed
            ? <CollapsedHeading title={title} onClick={e => this.onClick(e)}/>
            : <ExpandedHeading title={title} onClick={e => this.onClick(e)}/>}
          {collapsed ? null : children}
        </section>
      </div>
    );
  }
}

const CollapsedHeading = ({title, onClick}) => (
  <div className="TileFolder__Heading TileFolder__Heading__Collapse">
    <FloatTip title="Expand">
      <a href="#Expand" onClick={onClick}>
        <span className="TileFolder__HeadingText">{title}</span>
      </a>
    </FloatTip>
  </div>
);

const ExpandedHeading = ({title, onClick}) => (
  <div className="TileFolder__Heading TileFolder__Heading__Expand">
    <FloatTip title="Collapse">
      <a href="#Collapse" onClick={onClick}>
        <span className="TileFolder__HeadingText">{title}</span>
      </a>
    </FloatTip>
  </div>
);
