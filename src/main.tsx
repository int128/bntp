import './index.css'
import App from './App/component'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { migratePreferencesFromV2ToV3 } from './migration'
import { preloadFromCache } from './Themes/hook'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Preload the theme to prevent screen flicker.
preloadFromCache()

if (document.location.hash === '#popup') {
  document.documentElement.classList.add('popup')
}

migratePreferencesFromV2ToV3().catch((e) => console.error(e))
