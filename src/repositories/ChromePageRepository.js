import { Seq } from 'immutable';

import Folder from '../models/Folder';
import ChromePage from '../models/ChromePage';

import CHROME_PAGES from './ChromePages.json';

export default class ChromePageRepository {
  findFolders() {
    return Seq.of(new Folder({
      id: CHROME_PAGES.id,
      title: CHROME_PAGES.title,
      items: Seq(CHROME_PAGES.children).map(page => new ChromePage({
        id: page.id,
        title: page.title,
        url: page.url,
      })),
    }));
  }
}
