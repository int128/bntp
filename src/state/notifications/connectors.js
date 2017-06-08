import connectToEventListener from '../../infrastructure/connectToEventListener';
import networkStatusService from '../../infrastructure/networkStatusService';

import * as actionTypes from './actionTypes';

export const networkStatus = connectToEventListener(networkStatusService, () => ({
  type: actionTypes.RECEIVE_NETWORK_STATUS,
  networkStatus: networkStatusService.get(),
}));
