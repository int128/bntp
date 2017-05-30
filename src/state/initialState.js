import Manifest from '../infrastructure/Manifest';

import {
  chromePageRepository,
  themeRepository,
} from '../repositories';

export default function initialState() {
  const chromePageFolders = chromePageRepository.findFolders();
  const themes = themeRepository.findAll();
  const manifest = Manifest.get();
  return {
    chromePageFolders,
    themes,
    manifest,
  };
};
