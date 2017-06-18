import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Seq } from 'immutable';

import FolderContainer from './FolderContainer';

class ChromePageFoldersContainer extends React.Component {
  static propTypes = {
    chromePageFolders: PropTypes.instanceOf(Seq).isRequired,
  }

  render() {
    const { chromePageFolders } = this.props;
    return (
      <div>
        {chromePageFolders.map(folder => <FolderContainer key={folder.id} folder={folder}/>)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chromePageFolders: state.chromePageFolders,
});

export default connect(mapStateToProps)(ChromePageFoldersContainer);
