import './index.css'
import App from './App/component'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { migratePreferencesFromV2ToV3 } from './migration'
import { preloadFromCache } from './Themes/hook'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// preload the theme to prevent screen flicker
preloadFromCache()

// the default size of popup is too small, so explicitly set it
// https://developer.chrome.com/docs/extensions/reference/action/#popup
if (document.location.hash === '#popup') {
  document.documentElement.classList.add('popup')
}

migratePreferencesFromV2ToV3().catch((e) => console.error(e))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
