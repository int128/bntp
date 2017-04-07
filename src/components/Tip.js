import React, { PropTypes } from 'react';

import './Tip.css';

export class FixedTip extends React.Component {
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

export class FloatTip extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div className="FloatTip">
        {this.props.children}
        <div className="FloatTip__Baloon">
          <div className="FloatTip__Body">
            {this.props.title}
          </div>
        </div>
      </div>
    );
  }
}
