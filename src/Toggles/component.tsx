import { FC, useEffect } from 'react'
import { useLocalStorage } from '../infrastructure/localstorage'
import { defaultToggles, Toggles } from './model'

export type TogglesChangeHandler = {
  onTogglesChange: (toggles: Toggles) => void
}

type TogglesProps = TogglesChangeHandler

const TogglesComponent: FC<TogglesProps> = ({ onTogglesChange }) => {
  const [toggles, setToggles] = useLocalStorage<Toggles>('v3.toggles', defaultToggles)
  useEffect(() => {
    onTogglesChange(toggles)
  })
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={toggles.indent}
          onChange={(e) => setToggles({ ...toggles, indent: e.target.checked })}
        />
        Indent
      </label>
      <label>
        <input
          type="checkbox"
          checked={toggles.bookmarks}
          onChange={(e) => setToggles({ ...toggles, bookmarks: e.target.checked })}
        />
        Bookmarks
      </label>
      <label>
        <input
          type="checkbox"
          checked={toggles.topSites}
          onChange={(e) => setToggles({ ...toggles, topSites: e.target.checked })}
        />
        Top Sites
      </label>
    </div>
  )
}

export default TogglesComponent
