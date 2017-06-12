import * as actionTypes from './actionTypes';

import * as actionCreators from '../folderItem/actionCreators';

export default {
  [actionTypes.RECEIVE_CHARACTER_KEY]: ({key}, dispatch) => {
    dispatch(actionCreators.openByAccessKey(key));
  },
};
