import React from 'react';

import './Bar.css';

export default class BarFolder extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className="BarFolder">
        {children}
      </div>
    );
  }
}
