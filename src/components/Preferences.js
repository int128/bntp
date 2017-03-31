import React from 'react';

import ThemeSelection from '../containers/ThemeSelection';
import VisibilityPreference from '../containers/VisibilityPreference';

import Manifest from '../../public/manifest.json';

import './Preferences.css';

export default () =>
  <div className="Preferences">
    <form>
      <p>Themes</p>
      <ThemeSelection />
    </form>
    <form>
      <p>Toggle</p>
      <VisibilityPreference />
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
