import { Record, Seq } from 'immutable';

const BookmarkFolderRecord = Record({
  id: null,
  title: null,
  bookmarks: Seq(),
});

export default class BookmarkFolder extends BookmarkFolderRecord {
}
