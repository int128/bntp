import { fork, takeEvery, select, put } from 'redux-saga/effects';
import InAppPurchase from '../../infrastructure/InAppPurchase';

import * as actionTypes from './actionTypes';

import AppPreferenceRepository from '../../repositories/AppPreferenceRepository';

function* subscribeAppPreference() {
  const appPreferenceRepository = new AppPreferenceRepository();
  while (true) {
    yield appPreferenceRepository.poll();
    const appPreference = appPreferenceRepository.get();
    yield put({type: actionTypes.RECEIVE_APP_PREFERENCE, appPreference});
  }
}

function* saveAppPreference() {
  const appPreferenceRepository = new AppPreferenceRepository();
  const { appPreference } = yield select();
  appPreferenceRepository.save(appPreference);
}

function* fetchPurchases() {
  try {
    const purchases = yield InAppPurchase.getPurchases();
    yield put({type: actionTypes.RECEIVE_PURCHASES, purchases});
  } catch (e) {
    console.warn('Could not fetch purchases', e);
  }
}

function* makeDonation() {
  try {
    const orderId = yield InAppPurchase.buy('donation');
    console.info(`InAppPurchase.buy => orderId: ${orderId}`);
  } catch (e) {
    console.warn('Could not make a request for purchase', e);
  }
  yield fetchPurchases();
}

export default function* () {
  yield fork(subscribeAppPreference);
  yield fork(fetchPurchases);

  yield takeEvery(actionTypes.SET_APP_PREFERENCE, saveAppPreference);
  yield takeEvery(actionTypes.MAKE_DONATION, makeDonation);
}
