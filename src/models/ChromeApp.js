import { Record } from 'immutable';

const ChromeAppRecord = Record({
  id: null,
  title: null,
  link: null,
  canEdit: false,
});

export default class ChromeApp extends ChromeAppRecord {
}
