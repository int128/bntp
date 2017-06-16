import { all } from 'redux-saga/effects';

import folder from './folder/sagas';
import folderItem from './folderItem/sagas';
import folderItemEditor from './folderItemEditor/sagas';
import preferences from './preferences/sagas';

export default function* () {
  yield all([
    folder(),
    folderItem(),
    folderItemEditor(),
    preferences(),
  ]);
}
