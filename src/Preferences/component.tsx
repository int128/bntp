import './component.css'
import { FC } from 'react'
import ManifestComponent from '../Manifest/component'
import ThemesComponent from '../Themes/component'
import TogglesComponent from '../Toggles/component'

const PreferencesComponent: FC = () => (
  <form className="Preferences">
    <h2>Toggles</h2>
    <TogglesComponent />
    <h2>Themes</h2>
    <ThemesComponent />
    <h2>About</h2>
    <ManifestComponent />
  </form>
)

export default PreferencesComponent
