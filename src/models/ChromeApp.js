import { Record } from 'immutable';

export default class ChromeApp extends Record({
  id: null,
  title: null,
  link: null,
}) {
  setTitle = () => this
  setUrl = () => this
}
