import React from 'react';

import ThemeSelectionContainer from './ThemeSelectionContainer';
import VisibilityPreferenceContainer from './VisibilityPreferenceContainer';
import ProductContainer from './ProductContainer';

import './Preferences.css';

export default () =>
  <div className="Preferences">
    <form>
      <p>Themes</p>
      <ThemeSelectionContainer />
    </form>
    <form>
      <p>Toggle</p>
      <VisibilityPreferenceContainer />
    </form>
    <form>
      <ProductContainer />
    </form>
  </div>
