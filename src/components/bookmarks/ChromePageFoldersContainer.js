import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Seq } from 'immutable';

import FoldersContainer from './FoldersContainer';

class ChromePageFoldersContainer extends React.Component {
  static propTypes = {
    chromePageFolders: PropTypes.instanceOf(Seq).isRequired,
  }

  render() {
    const { chromePageFolders } = this.props;
    return <FoldersContainer folders={chromePageFolders} />;
  }
}

const mapStateToProps = state => ({
  chromePageFolders: state.chromePageFolders,
});

export default connect(mapStateToProps)(ChromePageFoldersContainer);
