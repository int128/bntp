import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Seq } from 'immutable';

import FoldersContainer from './FoldersContainer';

import * as actionCreators from '../../state/chromeApps/actionCreators';

class ChromeAppFoldersContainer extends React.Component {
  static propTypes = {
    chromeAppFolders: PropTypes.instanceOf(Seq).isRequired,
  }

  componentWillMount() {
    this.props.dispatch(actionCreators.subscribeChromeApps());
  }

  componentWillUnmount() {
    this.props.dispatch(actionCreators.unsubscribeChromeApps());
  }

  render() {
    const { chromeAppFolders } = this.props;
    return <FoldersContainer folders={chromeAppFolders} />;
  }
}

const mapStateToProps = state => ({
  chromeAppFolders: state.chromeAppFolders,
});

export default connect(mapStateToProps)(ChromeAppFoldersContainer);
