import './component.css'
import { FC, useState } from 'react'
import BookmarksComponent from '../Bookmarks/component'
import NetworkStatusComponent from '../NetworkStatus/component'
import PreferencesComponent from '../Preferences/component'
import SearchComponent from '../Search/component'
import TopSitesComponent from '../TopSites/component'
import { useToggles } from '../Toggles/repository'

const App: FC = () => {
  const [toggles] = useToggles()
  const [search, setSearch] = useState<string>('')
  const [openPreferences, setOpenPreferences] = useState(false)
  return (
    <div className="App">
      {toggles?.topSites ? (
        <div className="App__Header">
          <TopSitesComponent search={search} />
          <SearchComponent value={search} onChange={setSearch} />
        </div>
      ) : null}
      {toggles?.bookmarks ? <BookmarksComponent search={search} /> : null}
      <div className="App__Footer">
        <button onClick={() => setOpenPreferences(true)}>Preferences</button>
      </div>
      <PreferencesComponent open={openPreferences} onRequestClose={() => setOpenPreferences(false)} />
      <NetworkStatusComponent />
    </div>
  )
}

export default App
