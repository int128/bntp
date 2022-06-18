import { FC } from 'react'
import Manifest from '../Manifest/component'
import Themes from '../Themes/component'
import Toggles, { TogglesChangeHandler } from '../Toggles/component'
import './component.css'

type PreferencesProps = TogglesChangeHandler

const PreferencesComponent: FC<PreferencesProps> = ({ onTogglesChange }) => (
  <div className="Preferences">
    <form>
      <h4>Toggles</h4>
      <Toggles onTogglesChange={onTogglesChange} />
      <h4>Themes</h4>
      <Themes />
      <Manifest />
    </form>
  </div>
)

export default PreferencesComponent
