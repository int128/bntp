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
  const [searchText, setSearchText] = useState<string>('')
  return (
    <div className="App">
      <SearchComponent searchText={searchText} setSearchText={setSearchText} />
      {toggles?.topSites ? <TopSites searchText={searchText} /> : null}
      {toggles?.bookmarks ? <Bookmarks searchText={searchText} /> : null}
      <Preferences />
      <NetworkStatusComponent />
    </div>
  )
}

export default App
