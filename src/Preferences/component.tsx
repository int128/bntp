import { FC } from 'react'
import Manifest from '../Manifest/component'
import Themes from '../Themes/component'
import './component.css'

const PreferencesComponent: FC = () => (
  <div className="Preferences">
    <form>
      <h4>Themes</h4>
      <Themes />
      <Manifest />
    </form>
  </div>
)

export default PreferencesComponent
