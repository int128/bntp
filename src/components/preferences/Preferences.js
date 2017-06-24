import React from 'react';

import ThemesContainer from './ThemesContainer';
import VisibilitiesContainer from './VisibilitiesContainer';
import ProductContainer from './ProductContainer';

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
      <ProductContainer />
    </form>
  </div>
