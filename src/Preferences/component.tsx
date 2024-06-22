import './component.css'
import { FC, useEffect, useRef, useState } from 'react'
import ManifestComponent from '../Manifest/component'
import ThemesComponent from '../Themes/component'
import TogglesComponent from '../Toggles/component'

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
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (dialogRef.current === null) {
      return
    }
    if (shown) {
      dialogRef.current.showModal()
    } else {
      dialogRef.current.close()
    }
  }, [shown])
  return (
    <dialog
      ref={dialogRef}
      onCancel={onRequestClose}
      onClick={(e) => {
        if (dialogRef.current === null) {
          return
        }
        if (!isClickedInRect(e, dialogRef.current.getBoundingClientRect())) {
          onRequestClose()
        }
      }}
    >
      <div className="Preferences__Form">
        <h2>Toggles</h2>
        <TogglesComponent />
        <h2>Themes</h2>
        <ThemesComponent />
        <h2>About</h2>
        <ManifestComponent />
      </div>
    </dialog>
  )
}

const isClickedInRect = (e: React.MouseEvent, r: DOMRect): boolean =>
  e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom
