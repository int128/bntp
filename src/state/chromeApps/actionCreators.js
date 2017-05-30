import * as actionTypes from './actionTypes';

export function subscribeChromeApps() {
  return {
    type: actionTypes.SUBSCRIBE_CHROME_APPS,
  }
}

export function unsubscribeChromeApps() {
  return {
    type: actionTypes.UNSUBSCRIBE_CHROME_APPS,
  }
}
