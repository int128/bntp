import { Bookmark } from '../Bookmarks/model'

export const isValidEditingBookmark = (bookmark: Bookmark) => bookmark.title !== '' && bookmark.url !== ''
