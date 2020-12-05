import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import demoData from '../public/demo.json';
import MockLocalStorage from 'mock-local-storage';

import store from './state/store';
import RootContainer from './components/RootContainer';

const chromeMock = {
  runtime: {
    getManifest: () => ({}),
  },
  bookmarks: {
    getTree: () => new Promise(resolve => resolve(demoData.bookmarks)),
  },
  topSites: {
    get: () => new Promise(resolve => resolve(demoData.topSites)),
  },
  management: {
    getAll: () => new Promise(resolve => resolve([])),
  }
};

const googleMock = {
  payments: {
    inapp: {
      getPurchases: options => options.success({
        response: {
          details: []
        },
      }),
      buy: options => options.success({
        response: {
          orderId: 'orderId',
        }
      }),
    }
  }
};

it('renders without crashing', () => {
  global.chrome = chromeMock;
  global.google = googleMock;

  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store()}>
      <RootContainer/>
    </Provider>,
    div
  );
});
