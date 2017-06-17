import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Seq } from 'immutable';

import FolderPreferences from '../../models/FolderPreferences';

import FolderItemContainer from './FolderItemContainer';
import TileFolder from '../kits/TileFolder';

import * as actionCreators from '../../state/folderItem/actionCreators';
import * as connectors from '../../state/folderItem/connectors';

class FoldersContainer extends React.Component {
  static propTypes = {
    folderPreferences: PropTypes.instanceOf(FolderPreferences).isRequired,
    folders: PropTypes.instanceOf(Seq).isRequired,
    onEditClick: PropTypes.func,
  }

  render() {
    const { dispatch, folderPreferences, folders, onEditClick } = this.props;
    return (
      <div>
        {folders.map(folder =>
          <TileFolder key={folder.id}
                      title={folder.title}
                      collapsed={folderPreferences.isCollapsed(folder)}
                      onToggleClick={() => dispatch(actionCreators.toggleFolder(folder))}>
            {folder.items.map(item =>
              <FolderItemContainer key={item.id}
                                   item={item}
                                   onEditClick={item => onEditClick(item)}/>
            )}
          </TileFolder>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  folderPreferences: state.folderPreferences,
});

export default connect(mapStateToProps)(connectors.folderPreferences(FoldersContainer));
