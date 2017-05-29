import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FixedTip from '../kits/FixedTip';

import { subscribeNetworkStatus, unsubscribeNetworkStatus } from '../../actions/notifications';

export class NetworkStatusContainer extends React.Component {
  static propTypes = {
    online: PropTypes.bool.isRequired,
  }

  componentWillMount() {
    this.props.dispatch(subscribeNetworkStatus());
  }

  componentWillUnmount() {
    this.props.dispatch(unsubscribeNetworkStatus());
  }

  render() {
    if (this.props.online === false) {
      return <FixedTip>Network is Offline</FixedTip>;
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  online: state.online,
});

export default connect(mapStateToProps)(NetworkStatusContainer);
