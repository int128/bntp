import * as actionTypes from './actionTypes';

export function toggleFolderCollapse(folder) {
  return {
    type: actionTypes.TOGGLE_FOLDER_COLLAPSE,
    folder,
  };
}

export function subscribeSelectedTheme() {
  return {
    type: actionTypes.SUBSCRIBE_SELECTED_THEME,
  };
}

export function unsubscribeSelectedTheme() {
  return {
    type: actionTypes.UNSUBSCRIBE_SELECTED_THEME,
  };
}

export function selectTheme(theme) {
  return {
    type: actionTypes.RECEIVE_SELECTED_THEME,
    theme
  };
}

export function subscribeVisibilities() {
  return {
    type: actionTypes.SUBSCRIBE_VISIBILITIES,
  };
}

export function unsubscribeVisibilities() {
  return {
    type: actionTypes.UNSUBSCRIBE_VISIBILITIES,
  };
}

export function toggleVisibility(visibility) {
  return {
    type: actionTypes.TOGGLE_VISIBILITY,
    visibility
  };
}
