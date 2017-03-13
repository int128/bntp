import React from 'react';

import './index.css';

export default function (props) {
  return (
    <div className="FixedTip">
      <div className="FixedTip__Body">
        {props.children}
      </div>
    </div>
  );
}
