import { folderPreferenceRepository } from '../../../repositories';

import * as actionTypes from '../actionTypes';

export default {
  [actionTypes.TOGGLE_FOLDER_COLLAPSE]: (action, dispatch, state) => {
    folderPreferenceRepository.save(state.folderPreference);
  },
};
