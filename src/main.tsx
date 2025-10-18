import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/component'
import { migratePreferencesFromV2ToV3 } from './migration'
import { SubscribeThemeComponent } from './Themes/component'
import { preloadThemeStyleFromLocalStorageCache } from './Themes/style'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <SubscribeThemeComponent />
  </React.StrictMode>,
)

// Preload the theme to prevent screen flicker.
preloadThemeStyleFromLocalStorageCache(localStorage)

if (document.location.hash === '#popup') {
  document.documentElement.classList.add('popup')
}

migratePreferencesFromV2ToV3().catch((e) => console.error(e))
