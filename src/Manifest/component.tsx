import { FC, useState } from 'react'
import { getManifest } from './repository'

const ManifestComponent: FC = () => {
  const [manifest] = useState(getManifest())
  return (
    <>
      <div>
        Thank you for using the extension. {manifest.name} {manifest.version}
      </div>
      <a href={`https://chrome.google.com/webstore/detail/${manifest.id}`}>
        <label>Review on Web Store</label>
      </a>
    </>
  )
}

export default ManifestComponent
