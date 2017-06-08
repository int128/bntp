import { Record } from 'immutable';

const ChromePageRecord = Record({
  id: null,
  title: null,
  link: null,
});

export default class ChromePage extends ChromePageRecord {
  setTitle = () => this
  setUrl = () => this
}
