export const TOGGLE_FOLDER_COLLAPSE = 'TOGGLE_BOOKMARK_FOLDER_COLLAPSE';
export const RECEIVE_FOLDER_PREFERENCE = 'RECEIVE_FOLDER_PREFERENCES';

export const SUBSCRIBE_SELECTED_THEME = 'SUBSCRIBE_SELECTED_THEME';
export const UNSUBSCRIBE_SELECTED_THEME = 'UNSUBSCRIBE_SELECTED_THEME';
export const FETCH_SELECTED_THEME = 'FETCH_SELECTED_THEME';
export const RECEIVE_SELECTED_THEME = 'RECEIVE_SELECTED_THEME';

export const SUBSCRIBE_VISIBILITIES = 'SUBSCRIBE_VISIBILITIES';
export const UNSUBSCRIBE_VISIBILITIES = 'UNSUBSCRIBE_VISIBILITIES';
export const FETCH_VISIBILITIES = 'FETCH_VISIBILITIES';
export const RECEIVE_VISIBILITIES = 'RECEIVE_VISIBILITIES';
export const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY';

export function toggleFolderCollapse(folder) {
  return {
    type: TOGGLE_FOLDER_COLLAPSE,
    folder,
  };
}

export function subscribeSelectedTheme() {
  return {
    type: SUBSCRIBE_SELECTED_THEME,
  };
}

export function unsubscribeSelectedTheme() {
  return {
    type: UNSUBSCRIBE_SELECTED_THEME,
  };
}

export function selectTheme(theme) {
  return {
    type: RECEIVE_SELECTED_THEME,
    theme
  };
}

export function subscribeVisibilities() {
  return {
    type: SUBSCRIBE_VISIBILITIES,
  };
}

export function unsubscribeVisibilities() {
  return {
    type: UNSUBSCRIBE_VISIBILITIES,
  };
}

export function toggleVisibility(visibility) {
  return {
    type: TOGGLE_VISIBILITY,
    visibility
  };
}
