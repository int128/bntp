import { Record, Seq } from 'immutable';

const FolderRecord = Record({
  id: null,
  title: null,
  items: Seq(),
});

export default class Folder extends FolderRecord {
}
