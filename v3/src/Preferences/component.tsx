import React, { FC } from 'react';
import { Themes } from '../Themes/component';
import './component.css';

export const Preferences: FC = () =>
  <div className="Preferences">
    <form>
      <h4>Themes</h4>
      <Themes />
    </form>
  </div>
