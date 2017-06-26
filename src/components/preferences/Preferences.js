import React from 'react';

import ThemesContainer from './ThemesContainer';
import VisibilitiesContainer from './VisibilitiesContainer';
import ManifestContainer from './ManifestContainer';

import './Preferences.css';

export default () =>
  <div className="Preferences">
    <form>
      <p>Themes</p>
      <ThemesContainer />
    </form>
    <form>
      <p>Toggle</p>
      <VisibilitiesContainer />
    </form>
    <form>
      <ManifestContainer />
    </form>
  </div>
