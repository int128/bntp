import React from 'react';
import PropTypes from 'prop-types';

export default class Link extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  onClick(e) {
    if (this.props.onClick(e) === true) {
      e.preventDefault();
    }
  }

  render() {
    return (
      <a href={this.props.url} onClick={e => this.onClick(e)}>
        {this.props.children}
      </a>
    );
  }
}
