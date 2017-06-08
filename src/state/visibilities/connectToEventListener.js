import connectToEventListener from '../../infrastructure/connectToEventListener';

import { visibilityRepository } from '../../repositories';

import * as actionTypes from './actionTypes';

export default connectToEventListener(visibilityRepository, () => ({
  type: actionTypes.RECEIVE_VISIBILITIES,
  visibilities: visibilityRepository.findAll(),
}));
