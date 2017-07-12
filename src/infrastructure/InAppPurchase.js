import Purchase from '../models/Purchase';

import './iap/buy';
const { google } = window;

export default class InAppPurchase {
  /**
   * @returns {Array<Purchase>} array of purchase details
   */
  static *getPurchases() {
    const purchases = yield new Promise((resolve, reject) => {
      google.payments.inapp.getPurchases({
        parameters: {env: 'prod'},
        success: resolve,
        failure: reject,
      });
    });
    return purchases.response.details.map(detail => new Purchase(detail));
  }

  /**
   * @param {*} sku SKU
   * @returns {string} order ID
   */
  static *buy(sku) {
    const buy = yield new Promise((resolve, reject) => {
      google.payments.inapp.buy({
        parameters: {env: 'prod'},
        sku,
        success: resolve,
        failure: reject,
      });
    });
    return buy.response.orderId;
  }
}
