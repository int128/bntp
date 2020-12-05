import { Record } from 'immutable';

export default class Purchase extends Record({
  kind: null,
  itemId: null,
  sku: null,
  createdTime: null,
  state: null
}) {
}
