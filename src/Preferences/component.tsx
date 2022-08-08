import './component.css'
import { FC } from 'react'
import Manifest from '../Manifest/component'
import Themes from '../Themes/component'
import Toggles from '../Toggles/component'

const PreferencesComponent: FC = () => (
  <form className="Preferences">
    <h2>Toggles</h2>
    <Toggles />
    <h2>Themes</h2>
    <Themes />
    <h2>About</h2>
    <Manifest />
  </form>
)

export default PreferencesComponent
