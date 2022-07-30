import './App.css'
import Bookmarks from './Bookmarks/component'
import Preferences from './Preferences/component'
import ShortcutKey from './ShortcutKey/component'
import TopSites from './TopSites/component'
import { useToggles } from './Toggles/repository'

const App = () => {
  const [toggles] = useToggles()
  return (
    <div className="App">
      {toggles?.topSites ? <TopSites /> : null}
      {toggles?.bookmarks ? <Bookmarks /> : null}
      <Preferences />
      <ShortcutKey />
    </div>
  )
}

export default App
