import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import { initializeListeners } from './actions';
import reducers from './reducers';
import App from './containers/App';

import {
  collapsedFolderRepository,
  themeRepository,
  themePreferenceRepository,
  visibilityRepository,
} from './repositories';

import './index.css';

const initialState = () => {
  const collapsedFolders = collapsedFolderRepository.get();
  const selectedTheme = themePreferenceRepository.get();
  const themes = themeRepository.findAll();
  const visibilities = visibilityRepository.findAll();
  return {
    collapsedFolders,
    selectedTheme,
    themes,
    visibilities,
  };
};

const store = createStore(
  reducers,
  initialState(),
  applyMiddleware(thunk, createLogger())
);

// Apply theme on the root element
store.subscribe(() => {
  const { selectedTheme } = store.getState();
  document.documentElement.className = `Theme__${selectedTheme.id}`;
});

store.subscribe(() => {
  const { collapsedFolders, selectedTheme, visibilities } = store.getState();
  collapsedFolderRepository.save(collapsedFolders);
  themePreferenceRepository.save(selectedTheme);
  visibilityRepository.save(visibilities);
});

store.dispatch(initializeListeners());

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
