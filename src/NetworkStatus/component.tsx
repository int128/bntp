import './component.css'
import { FC } from 'react'
import { useOnLine } from './repository'

const NetworkStatusComponent: FC = () => {
  const [onLine] = useOnLine()
  if (!onLine) {
    return <div className="NetworkStatus">No Internet Connection</div>
  }
}

export default NetworkStatusComponent
