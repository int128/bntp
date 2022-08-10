import './component.css'
import { FC } from 'react'
import { useOnLine } from './repository'

const NetworkStatusComponent: FC = () => {
  const [onLine] = useOnLine()
  if (onLine) {
    return null
  }
  return <div className="NetworkStatus">OFFLINE</div>
}

export default NetworkStatusComponent
