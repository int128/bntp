import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import reducers from './state/reducers';
import listeners from './state/listeners';

import Manifest from './infrastructure/Manifest';
import ListenerMiddleware from './infrastructure/ListenerMiddleware';

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
  const manifest = Manifest.get();
  return {
    chromePageFolders,
    folderPreference,
    selectedTheme,
    themes,
    visibilities,
    manifest,
  };
};

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
