import * as repositories from '../../repositories';

import * as actionTypes from './actionTypes';

export default {
  [actionTypes.TOGGLE_FOLDER]: (action, dispatch, store) => {
    const { folderPreferences } = store.getState();
    repositories.folderPreferenceRepository.save(folderPreferences);
  },
};
