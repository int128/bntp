import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import ListenerMiddleware from './infrastructure/ListenerMiddleware';

import reducers from './state/reducers';
import listeners from './state/listeners';
import initialState from './state/initialState';

import renderInitialState from './state/preferences/renderInitialState';
import registerKeyHook from './state/folderItem/registerKeyHook';

import RootContainer from './components/RootContainer';

// Prevent theme-less white page
renderInitialState();

const devMiddlewares = [];
if (process.env.NODE_ENV === 'development') {
  devMiddlewares.push(require('redux-logger')());
}

const store = createStore(
  combineReducers(reducers),
  initialState(),
  applyMiddleware(ListenerMiddleware(listeners), ...devMiddlewares));

registerKeyHook(store.dispatch);

render(
  <Provider store={store}>
    <RootContainer/>
  </Provider>,
  document.getElementById('root')
);
