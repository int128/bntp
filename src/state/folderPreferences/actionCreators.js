import * as actionTypes from './actionTypes';

export function subscribe() {
  return {
    type: actionTypes.SUBSCRIBE_FOLDER_PREFERENCES,
  }
}

export function unsubscribe() {
  return {
    type: actionTypes.UNSUBSCRIBE_FOLDER_PREFERENCES,
  }
}

export function toggle(folder) {
  return {
    type: actionTypes.TOGGLE_FOLDER,
    folder
  }
}
