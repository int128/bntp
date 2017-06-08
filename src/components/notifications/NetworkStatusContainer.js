import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FixedTip from '../kits/FixedTip';

import connectToEventListener from '../../state/notifications/connectToEventListener';

export class NetworkStatusContainer extends React.Component {
  static propTypes = {
    networkStatus: PropTypes.bool.isRequired,
  }

  render() {
    if (this.props.networkStatus === false) {
      return <FixedTip>Network is Offline</FixedTip>;
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  networkStatus: state.networkStatus,
});

export default connect(mapStateToProps)(connectToEventListener(NetworkStatusContainer));
