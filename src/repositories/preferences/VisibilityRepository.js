import { Seq } from 'immutable';

import Visibility from '../../models/preferences/Visibility';
import Visibilities from '../../models/preferences/Visibilities';

const HIDDEN_COMPONENTS = 'HIDDEN_COMPONENTS';

export default class VisibilityRepository {
  static all = Seq.of(
    new Visibility({id: 'top-sites', title: 'Top Sites'}),
    new Visibility({id: 'bookmarks', title: 'Bookmarks'}),
  )

  findAll() {
    const hiddenIds = Seq(JSON.parse(localStorage.getItem(HIDDEN_COMPONENTS)));
    return new Visibilities(
      VisibilityRepository.all.map(visibility =>
        visibility.set('visible', !hiddenIds.find(id => id === visibility.id))));
  }

  save(visibilities) {
    const hiddenIds = visibilities.findHidden().map(visibility => visibility.id);
    localStorage.setItem(HIDDEN_COMPONENTS, JSON.stringify(hiddenIds));
  }

  onChange(callback) {
    window.addEventListener('storage', e => {
      if (e.storageArea === localStorage && e.key === HIDDEN_COMPONENTS && e.newValue !== null) {
        callback(this.findAll());
      }
    });
  }
}
