import React from 'react';

import './index.css';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {collapse: props.collapse};
  }
  onClick(e) {
    if (this.props.onCollapse) {
      this.props.onCollapse.call(null, this.props, !this.state.collapse);
    }
    this.setState({collapse: !this.state.collapse});
    e.preventDefault();
  }
  render() {
    if (this.state.collapse) {
      return (
        <Collapsed title={this.props.title} onClick={this.onClick.bind(this)} />
      );
    } else {
      return (
        <Expanded title={this.props.title} onClick={this.onClick.bind(this)}>
          {this.props.children}
        </Expanded>);
    }
  }
}

function Collapsed(props) {
  return (
    <section className="TileFolder">
      <div className="TileFolder__Heading TileFolder__Heading__Collapse">
        <a href="click: Expand this folder" onClick={props.onClick}>
          {props.title}
        </a>
      </div>
    </section>
  );
}

function Expanded(props) {
  return (
    <section className="TileFolder">
      <div className="TileFolder__Heading TileFolder__Heading__Expand">
        <a href="click: Collapse this folder" onClick={props.onClick}>
          {props.title}
        </a>
      </div>
      {props.children}
    </section>
  );
}
