import { Record } from 'immutable';

export default class ChromePage extends Record({
  id: null,
  title: null,
  link: null,
}) {
  setTitle = () => this
  setUrl = () => this
}
