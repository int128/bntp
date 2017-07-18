import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './state/store';

import RootContainer from './components/RootContainer';

import './index.css';

ReactDOM.render(
  <Provider store={store()}>
    <RootContainer/>
  </Provider>,
  document.getElementById('root')
);
