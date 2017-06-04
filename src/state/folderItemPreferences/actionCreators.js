import * as actionTypes from './actionTypes';

export function subscribe() {
  return {
    type: actionTypes.SUBSCRIBE_FOLDER_ITEM_PREFERENCES,
  }
}

export function unsubscribe() {
  return {
    type: actionTypes.UNSUBSCRIBE_FOLDER_ITEM_PREFERENCES,
  }
}
