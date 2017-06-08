import { themePreferenceRepository } from '../../repositories';

import RootTheme from '../../components/RootTheme';

export default function () {
  RootTheme.render(themePreferenceRepository.getOrDefault());
}
