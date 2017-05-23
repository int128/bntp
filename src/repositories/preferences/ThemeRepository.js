import { Seq } from 'immutable';

import Theme from '../../models/preferences/Theme';

export default class ThemeRepository {
  static all = Seq.of(
    new Theme({id: 'light', title: 'Light'}),
    new Theme({id: 'dark', title: 'Dark'}),
    new Theme({id: 'solarized-light', title: 'Solarized Light'}),
    new Theme({id: 'solarized-dark', title: 'Solarized Dark'}),
  )

  first = () => ThemeRepository.all.first()

  findAll = () => ThemeRepository.all

  findById = id => ThemeRepository.all.find(theme => theme.id === id)
}
