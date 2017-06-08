import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FixedTip from '../kits/FixedTip';

import * as connectors from '../../state/notifications/connectors';

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

export default connect(mapStateToProps)(connectors.networkStatus(NetworkStatusContainer));
