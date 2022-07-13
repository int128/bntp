import './App.css'

import Bookmarks from './Bookmarks/component'
import Preferences from './Preferences/component'
import { useToggles } from './Toggles/repository'
import TopSites from './TopSites/component'

const App = () => {
  const [toggles] = useToggles()
  return (
    <div className="App">
      {toggles?.topSites ? <TopSites /> : null}
      {toggles?.bookmarks ? <Bookmarks /> : null}
      <Preferences />
    </div>
  )
}

export default App
