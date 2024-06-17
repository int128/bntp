import './component.css'
import { FC, useState } from 'react'
import ManifestComponent from '../Manifest/component'
import ThemesComponent from '../Themes/component'
import TogglesComponent from '../Toggles/component'
import { createPortal } from 'react-dom'

const PreferencesComponent: FC = () => {
  const [shown, setShown] = useState<boolean>(false)
  return (
    <div className="Preferences">
      <div className="Preferences__Toggle">
        <button onClick={() => setShown(true)}>Preferences</button>
      </div>
      <PreferencesModalComponent shown={shown} onRequestClose={() => setShown(false)} />
    </div>
  )
}

export default PreferencesComponent

type PreferencesModalComponentProps = {
  shown: boolean
  onRequestClose: () => void
}

const PreferencesModalComponent: FC<PreferencesModalComponentProps> = ({ shown, onRequestClose }) => {
  if (shown === false) {
    return null
  }
  return createPortal(
    <div className="Preferences">
      <div className="Preferences__Modal">
        <form
          className="Preferences__Form"
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              onRequestClose()
            }
          }}
        >
          <h2>Toggles</h2>
          <TogglesComponent />
          <h2>Themes</h2>
          <ThemesComponent />
          <h2>About</h2>
          <ManifestComponent />
        </form>
      </div>
      <div className="Preferences__Overlay" onClick={onRequestClose} />
    </div>,
    document.body,
  )
}
