import { Record } from 'immutable';

const ChromePageRecord = Record({
  id: null,
  title: null,
  link: null,
  canEdit: false,
});

export default class ChromePage extends ChromePageRecord {
}
