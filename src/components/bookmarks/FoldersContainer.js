import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Seq } from 'immutable';

import { openBookmarkEdit } from '../../actions/bookmarks';
import { toggleFolderCollapse } from '../../actions/preferences';

import TileFolder from '../kits/TileFolder';
import TileFolderItem from '../kits/TileFolderItem';

import FolderPreference from '../../models/preferences/FolderPreference';

class FoldersContainer extends React.Component {
  static propTypes = {
    folders: PropTypes.instanceOf(Seq).isRequired,
    folderPreference: PropTypes.instanceOf(FolderPreference).isRequired,
  }

  render() {
    const { dispatch, folders, folderPreference } = this.props;
    return (
      <div className="Bookmarks">
        {folders.map(folder =>
          <TileFolder key={folder.id}
                      title={folder.title}
                      collapsed={folderPreference.isCollapse(folder)}
                      onToggle={collapsed => dispatch(toggleFolderCollapse(folder))}>
            {folder.bookmarks.map(bookmark =>
              <TileFolderItem key={bookmark.id}
                              link={bookmark.link}
                              canEdit={bookmark.canEdit}
                              editClick={e => dispatch(openBookmarkEdit(bookmark))}>
                {bookmark.title}
              </TileFolderItem>
            )}
          </TileFolder>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  folderPreference: state.folderPreference,
});

export default connect(mapStateToProps)(FoldersContainer);
