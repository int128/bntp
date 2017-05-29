import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Seq } from 'immutable';

import FoldersContainer from './FoldersContainer';

import { subscribeChromeApps, unsubscribeChromeApps } from '../../actions/bookmarks';

class ChromeAppFoldersContainer extends React.Component {
  static propTypes = {
    chromeAppFolders: PropTypes.instanceOf(Seq).isRequired,
  }

  componentWillMount() {
    this.props.dispatch(subscribeChromeApps());
  }

  componentWillUnmount() {
    this.props.dispatch(unsubscribeChromeApps());
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
