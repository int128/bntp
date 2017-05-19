import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Seq } from 'immutable';

import { toggleFolderCollapse, openBookmarkEdit } from '../actions';

import { TileFolder, TileFolderItem } from '../components/Tile';

import { FolderPreference } from '../models';

class Bookmarks extends React.Component {
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
                              canEdit={true}
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

export default connect(mapStateToProps)(Bookmarks);
