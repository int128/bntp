import { Record, Seq } from 'immutable';

export default class Folder extends Record({
  id: null,
  title: null,
  depth: 0,
  items: Seq(),
}) {
}
