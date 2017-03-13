import React from 'react';

import FixedTip from './tip/FixedTip.js';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {offline: false};
  }
  componentDidMount() {
    this.setState({offline: !window.navigator.onLine});
    window.addEventListener('online', () => this.setState({offline: false}));
    window.addEventListener('offline', () => this.setState({offline: true}));
  }
  render() {
    if (this.state.offline) {
      return <FixedTip>Network is Offline</FixedTip>;
    } else {
      return null;
    }
  }
}
