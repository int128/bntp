import { topSiteRepository } from '../../repositories';

import * as actionTypes from './actionTypes';

export default {
  [actionTypes.FETCH_TOP_SITES]: (action, dispatch) => {
    topSiteRepository.findAll(topSites => dispatch({
      type: actionTypes.RECEIVE_TOP_SITES,
      topSites,
    }));
  },
};
