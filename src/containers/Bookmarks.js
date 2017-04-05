import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Seq } from 'immutable';

import { toggleFolderCollapse } from '../actions';

import { TileFolder, TileFolderItem } from '../components/Tile';

import { FolderPreference } from '../models';

class Bookmarks extends React.Component {
  static propTypes = {
    bookmarkFolders: PropTypes.instanceOf(Seq).isRequired,
    folderPreference: PropTypes.instanceOf(FolderPreference).isRequired,
  }

  render() {
    const { dispatch, bookmarkFolders, folderPreference } = this.props;
    return (
      <div className="Bookmarks">
        {bookmarkFolders.map(bookmarkFolder =>
          <TileFolder key={bookmarkFolder.id}
                      title={bookmarkFolder.title}
                      collapsed={folderPreference.isCollapse(bookmarkFolder)}
                      onToggle={collapsed => dispatch(toggleFolderCollapse(bookmarkFolder))}>
            {bookmarkFolder.bookmarks.map(bookmark =>
              <TileFolderItem key={bookmark.id} url={bookmark.url} icon={bookmark.getIcon()}>
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
  bookmarkFolders: state.bookmarkFolders,
  folderPreference: state.folderPreference,
});

export default connect(mapStateToProps)(Bookmarks);
