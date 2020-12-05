import { Record } from 'immutable';

export default class TopSite extends Record({
  url: null,
  title: null,
  icon: null,
}) {
  constructor(record) {
    super({
      ...record,
      icon: `chrome://favicon/${record.url}`,
    });
  }
}
