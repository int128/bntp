import React from 'react';

import FilterContainer from './FilterContainer';
import AppPreferenceContainer from './AppPreferenceContainer';
import ThemesContainer from './ThemesContainer';
import ManifestContainer from './ManifestContainer';

import './Preferences.css';

export default () =>
  <div className="Preferences">
    <form>
      <h4>Filter</h4>
      <FilterContainer />
    </form>
    <form>
      <h4>Preferences</h4>
      <AppPreferenceContainer />
    </form>
    <form>
      <h4>Themes</h4>
      <ThemesContainer />
    </form>
    <form>
      <ManifestContainer />
    </form>
  </div>
