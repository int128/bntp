import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Folder from '../../models/Folder';
import FolderPreferences from '../../models/FolderPreferences';

import FolderItemContainer from './FolderItemContainer';
import TileFolder from '../kits/TileFolder';

import * as actionCreators from '../../state/folderItem/actionCreators';

class FolderContainer extends React.Component {
  static propTypes = {
    folderPreferences: PropTypes.instanceOf(FolderPreferences).isRequired,
    folder: PropTypes.instanceOf(Folder).isRequired,
    indentFolders: PropTypes.bool.isRequired,
    onEditClick: PropTypes.func,
  }

  render() {
    const { dispatch, folderPreferences, folder, indentFolders, onEditClick } = this.props;
    const folderPreference = folderPreferences.getById(folder.id);
    return (
      <div>
        <TileFolder
          key={folder.id}
          title={folder.title}
          indent={indentFolders ? folder.depth : 0}
          collapsed={folderPreference.collapsed}
          onToggleClick={() => dispatch(actionCreators.toggleFolder(folder))}>
          {folder.items.map(item =>
            <FolderItemContainer
              key={item.id}
              item={item}
              onEditClick={item => onEditClick(item)}/>
          )}
        </TileFolder>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  folderPreferences: state.folderPreferences,
  indentFolders: state.appPreference.indentFolders,
});

export default connect(mapStateToProps)(FolderContainer);
