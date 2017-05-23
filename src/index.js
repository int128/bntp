import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { initialize } from './actions';
import reducers from './reducers';
import { networkStatusManager } from './infrastructure';

import RootContainer from './components/RootContainer';

import {
  chromePageRepository,
  folderPreferenceRepository,
  themeRepository,
  themePreferenceRepository,
  visibilityRepository,
} from './repositories';

import './index.css';

const devMiddlewares = [];
if (process.env.NODE_ENV === 'development') {
  devMiddlewares.push(require('redux-logger')());
}

const initialState = () => {
  const chromePageFolders = chromePageRepository.findFolders();
  const folderPreference = folderPreferenceRepository.get();
  const selectedTheme = themePreferenceRepository.getOrDefault();
  const themes = themeRepository.findAll();
  const visibilities = visibilityRepository.findAll();
  const online = networkStatusManager.isOnline();
  return {
    chromePageFolders,
    folderPreference,
    selectedTheme,
    themes,
    visibilities,
    online,
  };
};

const store = createStore(reducers, initialState(), applyMiddleware(thunk, ...devMiddlewares));

// Apply theme on the root element
const renderTheme = () => {
  const { selectedTheme } = store.getState();
  document.documentElement.className = `Theme__${selectedTheme.id}`;
};

// Prevent theme-less white page on loading
renderTheme();

store.subscribe(renderTheme);
store.subscribe(() => {
  const { folderPreference, selectedTheme, visibilities } = store.getState();
  folderPreferenceRepository.save(folderPreference);
  themePreferenceRepository.save(selectedTheme);
  visibilityRepository.save(visibilities);
});

store.dispatch(initialize());

render(
  <Provider store={store}>
    <RootContainer/>
  </Provider>,
  document.getElementById('root')
);
