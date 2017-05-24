import { networkStatusManager } from '../infrastructure';

export const RECEIVE_ONLINE = 'RECEIVE_ONLINE';

export function initialize() {
  return dispatch => {
    networkStatusManager.onChange(online => dispatch({
      type: RECEIVE_ONLINE,
      online
    }))
  };
}
