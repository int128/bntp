import Manifest from '../infrastructure/Manifest';
import NetworkStatus from '../infrastructure/NetworkStatus';

import * as repositories from '../repositories';

export default () => ({
  chromePageFolders: repositories.chromePageRepository.findFolders(),
  appPreference: repositories.appPreferenceRepository.get(),
  manifest: Manifest.get(),
  folderPreferences: repositories.folderPreferenceRepository.get(),
  folderItemPreferences: repositories.folderItemPreferenceRepository.get(),
  networkStatus: NetworkStatus.get(),
});
