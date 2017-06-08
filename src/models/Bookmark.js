import { Record } from 'immutable';

export default class Bookmark extends Record({
  id: null,
  title: null,
  link: null,
}) {
  canEditTitle = true
  canEditLink = true

  setTitle = title => new Bookmark(this.set('title', title));
  setUrl = url => new Bookmark(this.set('link', this.link.set('url', url)));
}
