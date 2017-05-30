import { Seq } from 'immutable';

import * as actionTypes from './actionTypes';

import Visibilities from '../../models/preferences/Visibilities';
import FolderPreference from '../../models/preferences/FolderPreference';

export function folderPreference(state = new FolderPreference(), action) {
  switch (action.type) {
    case actionTypes.TOGGLE_FOLDER_COLLAPSE:
      return state.toggle(action.folder);
    case actionTypes.RECEIVE_FOLDER_PREFERENCE:
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
    case actionTypes.RECEIVE_SELECTED_THEME:
      return action.theme;
    default:
      return state;
  }
}

export function visibilities(state = new Visibilities(), action) {
  switch (action.type) {
    case actionTypes.RECEIVE_VISIBILITIES:
      return action.visibilities;
    case actionTypes.TOGGLE_VISIBILITY:
      return state.toggle(action.visibility);
    default:
      return state;
  }
}
