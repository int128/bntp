import './App.css'

import Bookmarks from './Bookmarks/component'
import Preferences from './Preferences/component'
import TopSites from './TopSites/component'

const App = () => (
  <div className="App">
    <TopSites />
    <Bookmarks />
    <Preferences />
  </div>
)

export default App
