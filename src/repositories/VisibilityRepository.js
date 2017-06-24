import { Seq } from 'immutable';

import Visibility from '../models/Visibility';
import Visibilities from '../models/Visibilities';

const HIDDEN_COMPONENTS = 'HIDDEN_COMPONENTS';

export default class VisibilityRepository {
  static all = Seq.of(
    new Visibility({id: 'top-sites', title: 'Top Sites'}),
    new Visibility({id: 'bookmarks', title: 'Bookmarks'}),
  )

  getAll() {
    const hiddenIds = Seq(JSON.parse(localStorage.getItem(HIDDEN_COMPONENTS)));
    return new Visibilities(
      VisibilityRepository.all.map(visibility =>
        visibility.set('visible', !hiddenIds.find(id => id === visibility.id))));
  }

  save(visibilities) {
    const hiddenIds = visibilities.findHidden().map(visibility => visibility.id);
    localStorage.setItem(HIDDEN_COMPONENTS, JSON.stringify(hiddenIds));
  }

  poll() {
    return new Promise(resolve => {
      const callback = e => {
        if (e.storageArea === localStorage && e.key === HIDDEN_COMPONENTS && e.newValue !== null) {
          window.removeEventListener('storage', callback);
          resolve();
        }
      }
      window.addEventListener('storage', callback);
    });
  }
}
