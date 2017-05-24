import { topSiteRepository } from '../repositories';

export const RECEIVE_TOP_SITES = 'RECEIVE_TOP_SITES';

export function fetchTopSites() {
  return dispatch => topSiteRepository.findAll(topSites => dispatch({
    type: RECEIVE_TOP_SITES,
    topSites,
  }));
}

export function initialize() {
  return dispatch => {
    dispatch(fetchTopSites());
  };
}
