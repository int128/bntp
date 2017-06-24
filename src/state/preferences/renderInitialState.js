import { themeRepository } from '../../repositories';

import RootTheme from '../../components/RootTheme';

export default function () {
  RootTheme.render(themeRepository.getAll().getSelected());
}
