import React from 'react';

import './index.css';

export default class extends React.Component {
  render() {
    return (
      <div className="BarFolder">
        {this.props.children}
      </div>
    );
  }
}
