import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import { registerBookmarksListener, localStorageChanged } from './actions';
import reducers from './reducers';
import App from './components/App';

import './index.css';

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
  const { collapsedFolderIds, selectedThemeName } = store.getState();
  saveState({ collapsedFolderIds, selectedThemeName });
});

window.addEventListener('storage', e => {
  if (e.storageArea === localStorage && e.key === 'state' && e.newValue !== null) {
    store.dispatch(localStorageChanged(JSON.parse(e.newValue)));
  }
});

store.dispatch(registerBookmarksListener());

store.subscribe(() => {
  const { selectedThemeName } = store.getState();
  document.documentElement.className = `Theme__${selectedThemeName}`;
});

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
