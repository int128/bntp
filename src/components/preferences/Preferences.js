import React from 'react';

import AppPreferenceContainer from './AppPreferenceContainer';
import ThemesContainer from './ThemesContainer';
import VisibilitiesContainer from './VisibilitiesContainer';
import ManifestContainer from './ManifestContainer';

import './Preferences.css';

export default () =>
  <div className="Preferences">
    <form>
      <p>Preferences</p>
      <AppPreferenceContainer />
      <VisibilitiesContainer />
    </form>
    <form>
      <p>Themes</p>
      <ThemesContainer />
    </form>
    <form>
      <ManifestContainer />
    </form>
  </div>
