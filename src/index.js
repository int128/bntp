import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducers from './reducers';
import App from './components/App';

function initialState() {
  const state = localStorage.getItem('state');
  return (state !== null) ? JSON.parse(state) : undefined;
}

const store = createStore(
  reducers,
  initialState(),
  applyMiddleware(thunk, createLogger())
);

function saveState(state) {
  localStorage.setItem('state', JSON.stringify(state));
}

store.subscribe(() => {
  const { collapsedFolderIds } = store.getState();
  saveState({ collapsedFolderIds });
});

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
