import { FC, useContext } from 'react'
import { ChromeContext } from '../infrastructure/chrome'

const ManifestComponent: FC = () => {
  const chrome = useContext(ChromeContext)
  const manifest = chrome.runtime.getManifest()
  return (
    <>
      <div>
        {manifest.name} {manifest.version}
      </div>
      <a href={`https://chrome.google.com/webstore/detail/${chrome.runtime.id}`}>
        <button>Review on Web Store</button>
      </a>
    </>
  )
}

export default ManifestComponent
