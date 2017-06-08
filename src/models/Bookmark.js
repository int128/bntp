import { Record } from 'immutable';

const BookmarkRecord = Record({
  id: null,
  title: null,
  link: null,
});

export default class Bookmark extends BookmarkRecord {
  canEditTitle = true
  canEditLink = true

  setTitle = title => new Bookmark(this.set('title', title));
  setUrl = url => new Bookmark(this.set('link', this.link.set('url', url)));
}
