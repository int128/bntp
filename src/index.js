import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducers from './reducers';
import App from './components/App';

const store = createStore(
  reducers,
  applyMiddleware(thunk, createLogger())
);

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
