import './App.css'
import Bookmarks from './Bookmarks/component'
import NetworkStatusComponent from './NetworkStatus/component'
import Preferences from './Preferences/component'
import SearchComponent from './Search/component'
import TopSites from './TopSites/component'
import { useState } from 'react'
import { useToggles } from './Toggles/repository'

const App = () => {
  const [toggles] = useToggles()
  const [search, setSearch] = useState<string>('')
  return (
    <div className="App">
      <SearchComponent value={search} onChange={setSearch} />
      {toggles?.topSites ? <TopSites search={search} /> : null}
      {toggles?.bookmarks ? <Bookmarks search={search} /> : null}
      <Preferences />
      <NetworkStatusComponent />
    </div>
  )
}

export default App
