import './App.css'
import BookmarkEditorComponent from './BookmarkEditor/component'
import Preferences from './Preferences/component'
import TopSites from './TopSites/component'
import { useToggles } from './Toggles/repository'

const App = () => {
  const [toggles] = useToggles()
  return (
    <div className="App">
      {toggles?.topSites ? <TopSites /> : null}
      {toggles?.bookmarks ? <BookmarkEditorComponent /> : null}
      <Preferences />
    </div>
  )
}

export default App
