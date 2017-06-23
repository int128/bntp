import { fork, put } from 'redux-saga/effects';

import * as actionTypes from './actionTypes';

import networkStatusService from '../../infrastructure/networkStatusService';

function* subscribeNetworkStatus() {
  while (true) {
    yield networkStatusService.poll();
    const networkStatus = networkStatusService.get();
    yield put({type: actionTypes.RECEIVE_NETWORK_STATUS, networkStatus});
  }
}

export default function* () {
  yield fork(subscribeNetworkStatus);
}
