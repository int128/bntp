import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'

import reducers from './state/reducers';
import initialState from './state/initialState';
import rootSaga from './state/sagas';

import RootContainer from './components/RootContainer';

const devMiddlewares = [];
if (process.env.NODE_ENV === 'development') {
  devMiddlewares.push(require('redux-logger')());
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers(reducers),
  initialState(),
  applyMiddleware(sagaMiddleware, ...devMiddlewares));

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <RootContainer/>
  </Provider>,
  document.getElementById('root')
);
