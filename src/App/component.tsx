import './component.css'
import { FC, useState } from 'react'
import Bookmarks from '../Bookmarks/component'
import NetworkStatusComponent from '../NetworkStatus/component'
import Preferences from '../Preferences/component'
import SearchComponent from '../Search/component'
import TopSites from '../TopSites/component'
import { useToggles } from '../Toggles/repository'

const App: FC = () => {
  const [toggles] = useToggles()
  const [search, setSearch] = useState<string>('')
  return (
    <div className="App">
      {toggles?.topSites ? (
        <div className="App__Header">
          <TopSites search={search} />
          <SearchComponent value={search} onChange={setSearch} />
        </div>
      ) : null}
      {toggles?.bookmarks ? <Bookmarks search={search} /> : null}
      <Preferences />
      <NetworkStatusComponent />
    </div>
  )
}

export default App
