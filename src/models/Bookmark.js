import { Record } from 'immutable';

const BookmarkRecord = Record({
  id: null,
  title: null,
  link: null,
  canEdit: false,
});

export default class Bookmark extends BookmarkRecord {
}
