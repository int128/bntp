import './component.css'
import { FC, useState } from 'react'
import DialogComponent from '../Dialog/component'
import ManifestComponent from '../Manifest/component'
import ThemesComponent from '../Themes/component'
import TogglesComponent from '../Toggles/component'

type PreferencesComponentProps = {
  initialOpen?: boolean
}

const PreferencesComponent: FC<PreferencesComponentProps> = ({ initialOpen }) => {
  const [open, setOpen] = useState<boolean>(initialOpen ?? false)
  return (
    <div className="Preferences">
      <div className="Preferences__Toggle">
        <button onClick={() => setOpen(true)}>Preferences</button>
      </div>
      <DialogComponent className="Preferences" open={open} onRequestClose={() => setOpen(false)}>
        <div className="Preferences__Form">
          <h2>Toggles</h2>
          <TogglesComponent />
          <h2>Themes</h2>
          <ThemesComponent />
          <h2>About</h2>
          <ManifestComponent />
        </div>
      </DialogComponent>
    </div>
  )
}

export default PreferencesComponent
