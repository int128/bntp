import './index.css'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { migratePreferencesFromV2ToV3 } from './migration'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

migratePreferencesFromV2ToV3().catch((e) => console.error(e))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
