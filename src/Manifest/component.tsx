import { FC, useState } from 'react'
import { getManifest } from './repository'

const ManifestComponent: FC = () => {
  const [manifest] = useState(getManifest())
  return (
    <div>
      <h4>
        {manifest.name} {manifest.version}
      </h4>
      <p>Thank you for using the app.</p>
      <a href={`https://chrome.google.com/webstore/detail/${manifest.id}`}>
        <label>Review on Web Store</label>
      </a>
    </div>
  )
}

export default ManifestComponent
