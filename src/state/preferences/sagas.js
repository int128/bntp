import { fork, takeEvery, select, put } from 'redux-saga/effects';

import RootTheme from '../../components/RootTheme';

import * as actionTypes from './actionTypes';

import * as repositories from '../../repositories';

function* subscribeThemes() {
  while (true) {
    yield repositories.themeRepository.poll();
    const themes = repositories.themeRepository.getAll();
    yield put({type: actionTypes.RECEIVE_THEMES, themes});
    RootTheme.render(themes.getSelected());
  }
}

function* subscribeAppPreference() {
  while (true) {
    yield repositories.appPreferenceRepository.poll();
    const appPreference = repositories.appPreferenceRepository.get();
    yield put({type: actionTypes.RECEIVE_APP_PREFERENCE, appPreference});
  }
}

function* saveTheme() {
  const { themes } = yield select();
  repositories.themeRepository.save(themes);
}

function* renderTheme() {
  const { themes } = yield select();
  RootTheme.render(themes.getSelected());
}

function* saveAppPreference() {
  const { appPreference } = yield select();
  repositories.appPreferenceRepository.save(appPreference);
}

export default function* () {
  yield fork(subscribeThemes);
  yield fork(subscribeAppPreference);

  yield takeEvery(actionTypes.SELECT_THEME, saveTheme);
  yield takeEvery(actionTypes.SELECT_THEME, renderTheme);

  yield takeEvery(actionTypes.SET_APP_PREFERENCE, saveAppPreference);
}
