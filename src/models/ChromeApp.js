import { Record } from 'immutable';

const ChromeAppRecord = Record({
  id: null,
  title: null,
  link: null,
});

export default class ChromeApp extends ChromeAppRecord {
  setTitle = () => this
  setUrl = () => this
}
