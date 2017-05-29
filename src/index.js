import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';
import Manifest from './infrastructure/Manifest';
import ListenerMiddleware from './infrastructure/ListenerMiddleware';

import notificationsListener from './listeners/notifications';
import bookmarksListener from './listeners/bookmarks';
import topsitesListener from './listeners/topsites';
import preferencesListener from './listeners/preferences';

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

const store = createStore(reducers, initialState(),
  applyMiddleware(
    ListenerMiddleware(
      notificationsListener,
      bookmarksListener,
      topsitesListener,
      preferencesListener),
    ...devMiddlewares));

// Prevent theme-less white page on loading
document.documentElement.className = `Theme__${store.getState().selectedTheme.id}`;

render(
  <Provider store={store}>
    <RootContainer/>
  </Provider>,
  document.getElementById('root')
);
