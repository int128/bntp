import connectToEventListener from '../../infrastructure/connectToEventListener';
import networkStatus from '../../infrastructure/networkStatus';

import * as actionTypes from './actionTypes';

export default connectToEventListener(networkStatus, () => ({
  type: actionTypes.RECEIVE_NETWORK_STATUS,
  networkStatus: networkStatus.get(),
}));
