import React, { useEffect, useState } from 'react';

import './Themes.css';

export function Themes() {
  const THEMES = ['light', 'dark', 'solarized-light', 'solarized-dark'];
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);

  useEffect(() => {
    document.documentElement.className = `Theme__${selectedTheme}`;
  });

  return (
    <div>
      {THEMES.map(theme =>
        <label key={theme}>
          <input type="radio" name="Theme" value={theme}
            checked={theme === selectedTheme}
            onChange={() => setSelectedTheme(theme)}
          />
          {theme}
        </label>
      )}
    </div>
  );
}
