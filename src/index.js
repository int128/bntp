import React from 'react';
import ReactDOM from 'react-dom';

import Main from './view/Main.js';
import Theme from './view/theme/Theme.js';

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);

Theme.render(document.documentElement);
