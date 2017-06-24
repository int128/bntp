import Manifest from '../infrastructure/Manifest';
import networkStatusService from '../infrastructure/networkStatusService';

import * as repositories from '../repositories';

export default () => ({
  chromePageFolders: repositories.chromePageRepository.findFolders(),
  visibilities: repositories.visibilityRepository.getAll(),
  themes: repositories.themeRepository.getAll(),
  manifest: Manifest.get(),
  folderPreferences: repositories.folderPreferenceRepository.get(),
  folderItemPreferences: repositories.folderItemPreferenceRepository.get(),
  networkStatus: networkStatusService.get(),
});
