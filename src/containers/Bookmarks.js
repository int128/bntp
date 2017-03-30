import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Seq } from 'immutable';

import { fetchBookmarks, toggleBookmarkFolderCollapse } from '../actions';

import { TileFolder, TileFolderItem } from '../components/Tile';

class Bookmarks extends React.Component {
  static propTypes = {
    bookmarkFolders: PropTypes.instanceOf(Seq).isRequired,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchBookmarks());
  }

  render() {
    const { dispatch, bookmarkFolders } = this.props;
    return (
      <div className="Bookmarks">
        {bookmarkFolders.map(bookmarkFolder =>
          <TileFolder key={bookmarkFolder.id}
                      title={bookmarkFolder.title}
                      collapsed={bookmarkFolder.collapsed}
                      onToggle={collapsed => dispatch(toggleBookmarkFolderCollapse(bookmarkFolder))}>
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
});

export default connect(mapStateToProps)(Bookmarks);
