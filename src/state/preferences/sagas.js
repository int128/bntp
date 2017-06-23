import { fork, takeEvery, select, put } from 'redux-saga/effects';

import RootTheme from '../../components/RootTheme';

import * as actionTypes from './actionTypes';

import * as repositories from '../../repositories';

function* subscribeVisibilities() {
  while (true) {
    yield repositories.visibilityRepository.poll();
    const visibilities = repositories.visibilityRepository.findAll();
    yield put({type: actionTypes.RECEIVE_VISIBILITIES, visibilities});
  }
}

function* subscribeSelectedTheme() {
  while (true) {
    yield repositories.themePreferenceRepository.poll();
    const theme = repositories.themePreferenceRepository.getOrDefault();
    yield put({type: actionTypes.RECEIVE_SELECTED_THEME, theme});
  }
}

function* saveVisibility() {
  const { visibilities } = yield select();
  repositories.visibilityRepository.save(visibilities);
}

function saveAndRenderTheme({theme}) {
  repositories.themePreferenceRepository.save(theme);
  RootTheme.render(theme);
}

function renderTheme({theme}) {
  RootTheme.render(theme);
}

export default function* () {
  yield fork(subscribeVisibilities);
  yield fork(subscribeSelectedTheme);

  yield takeEvery(actionTypes.TOGGLE_VISIBILITY, saveVisibility);

  yield takeEvery(actionTypes.SELECT_THEME, saveAndRenderTheme);
  yield takeEvery(actionTypes.RECEIVE_SELECTED_THEME, renderTheme);
}
