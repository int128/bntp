import { fork, takeEvery, select, put } from 'redux-saga/effects';

import * as actionTypes from './actionTypes';

import * as repositories from '../../repositories';

function* subscribeAppPreference() {
  while (true) {
    yield repositories.appPreferenceRepository.poll();
    const appPreference = repositories.appPreferenceRepository.get();
    yield put({type: actionTypes.RECEIVE_APP_PREFERENCE, appPreference});
  }
}

function* saveAppPreference() {
  const { appPreference } = yield select();
  repositories.appPreferenceRepository.save(appPreference);
}

export default function* () {
  yield fork(subscribeAppPreference);

  yield takeEvery(actionTypes.SET_APP_PREFERENCE, saveAppPreference);
}
