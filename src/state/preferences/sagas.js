import { takeEvery, select } from 'redux-saga/effects';

import RootTheme from '../../components/RootTheme';

import * as actionTypes from './actionTypes';

import * as repositories from '../../repositories';

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
  yield takeEvery(actionTypes.TOGGLE_VISIBILITY, saveVisibility);

  yield takeEvery(actionTypes.SELECT_THEME, saveAndRenderTheme);
  yield takeEvery(actionTypes.RECEIVE_SELECTED_THEME, renderTheme);
}
