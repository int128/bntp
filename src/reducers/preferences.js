import { Seq } from 'immutable';

import {
  TOGGLE_FOLDER_COLLAPSE,
  RECEIVE_FOLDER_PREFERENCE,
  RECEIVE_SELECTED_THEME,
  RECEIVE_VISIBILITIES,
  TOGGLE_VISIBILITY,
} from '../actions/preferences';

import Visibilities from '../models/preferences/Visibilities';
import FolderPreference from '../models/preferences/FolderPreference';

export function folderPreference(state = new FolderPreference(), action) {
  switch (action.type) {
    case TOGGLE_FOLDER_COLLAPSE:
      return state.toggle(action.folder);
    case RECEIVE_FOLDER_PREFERENCE:
      return action.folderPreference;
    default:
      return state;
  }
}

export function themes(state = Seq(), action) {
  return state;
}

export function selectedTheme(state = null, action) {
  switch (action.type) {
    case RECEIVE_SELECTED_THEME:
      return action.theme;
    default:
      return state;
  }
}

export function visibilities(state = new Visibilities(), action) {
  switch (action.type) {
    case RECEIVE_VISIBILITIES:
      return action.visibilities;
    case TOGGLE_VISIBILITY:
      return state.toggle(action.visibility);
    default:
      return state;
  }
}
