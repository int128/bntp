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
      <div>
        <a href={`https://chrome.google.com/webstore/detail/${chrome.runtime.id}`}>Review on Web Store</a>
      </div>
    </>
  )
}

export default ManifestComponent
