import * as actionTypes from './actionTypes';

export default function registerKeyHook(dispatch) {
  window.addEventListener('keypress', e => {
    if (e.key.length === 1) {
      const key = e.key.toUpperCase();
      dispatch({
        type: actionTypes.RECEIVE_CHARACTER_KEY,
        key
      });
    }
  });
}
