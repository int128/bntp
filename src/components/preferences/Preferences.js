import React from 'react';

import ThemeSelectionContainer from './ThemeSelectionContainer';
import VisibilityPreferenceContainer from './VisibilityPreferenceContainer';

import Manifest from '../../../public/manifest.json';

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
      <p>{Manifest.name} {Manifest.version}</p>
      <label>
        <a href={`https://chrome.google.com/webstore/detail/${window.chrome.runtime.id}`}>
          Review on Web Store
        </a>
      </label>
    </form>
  </div>
