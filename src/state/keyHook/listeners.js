import * as actionTypes from './actionTypes';

import * as actionCreators from '../folderItem/actionCreators';

export default {
  [actionTypes.RECEIVE_CHARACTER_KEY]: ({key}, dispatch, store) => {
    const { showFolderItemEditor } = store.getState();
    if (showFolderItemEditor === false) {
      dispatch(actionCreators.openByAccessKey(key));
    }
  },
};
