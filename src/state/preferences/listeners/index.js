import FolderListener from './FolderListener';
import ThemeSelectionListener from './ThemeSelectionListener';
import VisibilitiesListener from './VisibilitiesListener';

export default {
  ...FolderListener,
  ...ThemeSelectionListener,
  ...VisibilitiesListener,
};
