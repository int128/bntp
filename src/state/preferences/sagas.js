import { fork, takeEvery, select, put } from 'redux-saga/effects';

import RootTheme from '../../components/RootTheme';

import * as actionTypes from './actionTypes';

import * as repositories from '../../repositories';

function* subscribeVisibilities() {
  while (true) {
    yield repositories.visibilityRepository.poll();
    const visibilities = repositories.visibilityRepository.getAll();
    yield put({type: actionTypes.RECEIVE_VISIBILITIES, visibilities});
  }
}

function* subscribeThemes() {
  while (true) {
    yield repositories.themeRepository.poll();
    const themes = repositories.themeRepository.getAll();
    yield put({type: actionTypes.RECEIVE_THEMES, themes});
    RootTheme.render(themes.getSelected());
  }
}

function* saveVisibility() {
  const { visibilities } = yield select();
  repositories.visibilityRepository.save(visibilities);
}

function* saveTheme() {
  const { themes } = yield select();
  repositories.themeRepository.save(themes);
}

function* renderTheme() {
  const { themes } = yield select();
  RootTheme.render(themes.getSelected());
}

export default function* () {
  yield fork(subscribeVisibilities);
  yield fork(subscribeThemes);

  yield takeEvery(actionTypes.TOGGLE_VISIBILITY, saveVisibility);

  yield takeEvery(actionTypes.SELECT_THEME, saveTheme);
  yield takeEvery(actionTypes.SELECT_THEME, renderTheme);
}
