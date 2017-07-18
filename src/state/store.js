import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga'

import reducers from './reducers';
import initialState from './initialState';
import rootSaga from './sagas';

export default () => {
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

  return store;
}
