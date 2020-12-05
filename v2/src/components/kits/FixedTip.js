import React from 'react';

import './Tip.css';

export default class FixedTip extends React.Component {
  render() {
    return (
      <div className="FixedTip">
        <div className="FixedTip__Body">
          {this.props.children}
        </div>
      </div>
    );
  }
}
