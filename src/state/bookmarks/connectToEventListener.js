import connectToEventListener from '../../infrastructure/connectToEventListener';

import { bookmarkRepository } from '../../repositories';

import * as actionTypes from './actionTypes';

export default connectToEventListener(bookmarkRepository, () => ({type: actionTypes.FETCH_BOOKMARKS}));
