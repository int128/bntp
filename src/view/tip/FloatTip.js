import React from 'react';

import './index.css';

export default function (props) {
  return (
    <div className="FloatTip">
      {props.children}
      <div className="FloatTip__Baloon">
        <div className="FloatTip__Body">
          {props.title}
        </div>
      </div>
    </div>
  );
}
