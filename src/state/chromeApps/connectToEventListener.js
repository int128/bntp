import connectToEventListener from '../../infrastructure/connectToEventListener';

import { chromeAppRepository } from '../../repositories';

import * as actionTypes from './actionTypes';

export default connectToEventListener(chromeAppRepository, () => ({type: actionTypes.FETCH_CHROME_APPS}));
