import { visibilityRepository } from '../../repositories';

import * as actionTypes from './actionTypes';

export default {
  [actionTypes.TOGGLE_VISIBILITY]: (action, dispatch, store) => {
    visibilityRepository.save(store.getState().visibilities);
  },
};
