import { FC, useContext } from 'react'
import { ChromeContext } from '../infrastructure/chrome'

const ManifestComponent: FC = () => {
  const chrome = useContext(ChromeContext)
  const manifest = chrome.runtime.getManifest()
  return (
    <>
      <div>
        Thank you for using the extension. {manifest.name} {manifest.version}
      </div>
      <a href={`https://chrome.google.com/webstore/detail/${chrome.runtime.id}`}>
        <label>Review on Web Store</label>
      </a>
    </>
  )
}

export default ManifestComponent
