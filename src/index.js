import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import ListenerMiddleware from './infrastructure/ListenerMiddleware';

import reducers from './state/reducers';
import listeners from './state/listeners';
import initialState from './state/initialState';

import RootContainer from './components/RootContainer';

import './index.css';

const devMiddlewares = [];
if (process.env.NODE_ENV === 'development') {
  devMiddlewares.push(require('redux-logger')());
}

const store = createStore(
  combineReducers(reducers),
  initialState(),
  applyMiddleware(ListenerMiddleware(listeners), ...devMiddlewares));

// Prevent theme-less white page on loading
document.documentElement.className = `Theme__${store.getState().selectedTheme.id}`;

render(
  <Provider store={store}>
    <RootContainer/>
  </Provider>,
  document.getElementById('root')
);
