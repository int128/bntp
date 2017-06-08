import * as Connector from '../../infrastructure/Connector';

import networkStatusService from '../../infrastructure/networkStatusService';

import * as actionTypes from './actionTypes';

export const networkStatus = Connector.lazy(networkStatusService, () => ({
  type: actionTypes.RECEIVE_NETWORK_STATUS,
  networkStatus: networkStatusService.get(),
}));
