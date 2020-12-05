import { fork, put } from 'redux-saga/effects';

import * as actionTypes from './actionTypes';

import NetworkStatus from '../../infrastructure/NetworkStatus';

function* subscribeNetworkStatus() {
  while (true) {
    yield NetworkStatus.poll();
    const networkStatus = NetworkStatus.get();
    yield put({type: actionTypes.RECEIVE_NETWORK_STATUS, networkStatus});
  }
}

export default function* () {
  yield fork(subscribeNetworkStatus);
}
