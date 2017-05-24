import {
  folderPreferenceRepository,
  themePreferenceRepository,
  visibilityRepository,
} from '../repositories';

export const TOGGLE_FOLDER_COLLAPSE = 'TOGGLE_BOOKMARK_FOLDER_COLLAPSE';
export const RECEIVE_FOLDER_PREFERENCE = 'RECEIVE_FOLDER_PREFERENCES';
export const RECEIVE_THEMES = 'RECEIVE_THEMES';
export const SELECT_THEME = 'SELECT_THEME';
export const RECEIVE_VISIBILITIES = 'RECEIVE_VISIBILITIES';
export const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY';

export function toggleFolderCollapse(folder) {
  return {
    type: TOGGLE_FOLDER_COLLAPSE,
    folder,
  };
}

export function selectTheme(theme) {
  return {
    type: SELECT_THEME,
    theme
  };
}

export function toggleVisibility(visibility) {
  return {
    type: TOGGLE_VISIBILITY,
    visibility
  };
}

export function initialize() {
  return dispatch => {
    folderPreferenceRepository.onChange(folderPreference => dispatch({
      type: RECEIVE_FOLDER_PREFERENCE,
      folderPreference
    }));

    themePreferenceRepository.onChange(theme => dispatch(selectTheme(theme)));

    visibilityRepository.onChange(visibilities => dispatch({
      type: RECEIVE_VISIBILITIES,
      visibilities
    }));
  };
}
