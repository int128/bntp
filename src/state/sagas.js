import { all } from 'redux-saga/effects';

import folderItem from './folderItem/sagas';
import folderItemEditor from './folderItemEditor/sagas';
import preferences from './preferences/sagas';

export default function* () {
  yield all([
    folderItem(),
    folderItemEditor(),
    preferences(),
  ]);
}
