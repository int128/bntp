import { topSiteRepository } from '../repositories';
import * as ActionTypes from '../actions/topsites';

export default {
  [ActionTypes.FETCH_TOP_SITES]: (action, dispatch, state) => {
    topSiteRepository.findAll(topSites => dispatch({
      type: ActionTypes.RECEIVE_TOP_SITES,
      topSites,
    }));
  },
};
