import React from 'react';

import FilterContainer from './FilterContainer';
import AppPreferenceContainer from './AppPreferenceContainer';
import ThemesContainer from './ThemesContainer';
import ManifestContainer from './ManifestContainer';

import './Preferences.css';

export default () =>
  <div className="Preferences">
    <form>
      <p>Filter</p>
      <FilterContainer />
    </form>
    <form>
      <p>Preferences</p>
      <AppPreferenceContainer />
    </form>
    <form>
      <p>Themes</p>
      <ThemesContainer />
    </form>
    <form>
      <ManifestContainer />
    </form>
  </div>
