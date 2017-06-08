import * as actionTypes from './actionTypes';

export default function registerKeyHook(dispatch) {
  window.addEventListener('keydown', e => {
    if (e.target === document.body && e.key.length === 1) {
      const key = e.key.toUpperCase();
      dispatch({
        type: actionTypes.ACCESS_KEY_DOWN,
        key
      });
    }
  });
}
