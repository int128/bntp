import { takeEvery, select } from 'redux-saga/effects';

import * as actionTypes from './actionTypes';

import * as repositories from '../../repositories';

function* toggleFolder() {
  const { folderPreferences } = yield select();
  repositories.folderPreferenceRepository.save(folderPreferences);
}

export default function* () {
  yield takeEvery(actionTypes.TOGGLE_FOLDER, toggleFolder);
}
