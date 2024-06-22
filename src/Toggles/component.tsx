import { FC } from 'react'
import { useToggles } from './repository'

const TogglesComponent: FC = () => {
  const [toggles, setToggles] = useToggles()
  return (
    <form>
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
    </form>
  )
}

export default TogglesComponent
