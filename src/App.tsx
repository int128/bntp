import { useState } from 'react'
import './App.css'

import Bookmarks from './Bookmarks/component'
import Preferences from './Preferences/component'
import { Toggles } from './Toggles/model'
import TopSites from './TopSites/component'

const App = () => {
  const [toggles, setToggles] = useState<Toggles>()
  return (
    <div className="App">
      {toggles?.topSites ? <TopSites /> : null}
      {toggles?.bookmarks ? <Bookmarks /> : null}
      <Preferences onTogglesChange={setToggles} />
    </div>
  )
}

export default App
