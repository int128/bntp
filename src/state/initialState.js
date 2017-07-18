import Manifest from '../infrastructure/Manifest';
import NetworkStatus from '../infrastructure/NetworkStatus';

import ChromePageRepository from '../repositories/ChromePageRepository';
import AppPreferenceRepository from '../repositories/AppPreferenceRepository';
import FolderPreferenceRepository from '../repositories/FolderPreferenceRepository';
import FolderItemPreferenceRepository from '../repositories/FolderItemPreferenceRepository';

export default () => ({
  chromePageFolders: new ChromePageRepository().findFolders(),
  appPreference: new AppPreferenceRepository().get(),
  manifest: Manifest.get(),
  folderPreferences: new FolderPreferenceRepository().get(),
  folderItemPreferences: new FolderItemPreferenceRepository().get(),
  networkStatus: NetworkStatus.get(),
});
