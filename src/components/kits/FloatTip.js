import React from 'react';
import PropTypes from 'prop-types';

import './Tip.css';

export default class FloatTip extends React.Component {
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
