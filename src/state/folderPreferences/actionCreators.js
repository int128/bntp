import * as actionTypes from './actionTypes';

export function toggle(folder) {
  return {
    type: actionTypes.TOGGLE_FOLDER,
    folder
  }
}
