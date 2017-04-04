import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Seq } from 'immutable';

import { fetchBookmarks, toggleFolderCollapse } from '../actions';

import { TileFolder, TileFolderItem } from '../components/Tile';

import { CollapsedFolders } from '../models';

class Bookmarks extends React.Component {
  static propTypes = {
    bookmarkFolders: PropTypes.instanceOf(Seq).isRequired,
    collapsedFolders: PropTypes.instanceOf(CollapsedFolders).isRequired,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchBookmarks());
  }

  render() {
    const { dispatch, bookmarkFolders, collapsedFolders } = this.props;
    return (
      <div className="Bookmarks">
        {bookmarkFolders.map(bookmarkFolder =>
          <TileFolder key={bookmarkFolder.id}
                      title={bookmarkFolder.title}
                      collapsed={collapsedFolders.isCollapse(bookmarkFolder)}
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
  collapsedFolders: state.collapsedFolders,
});

export default connect(mapStateToProps)(Bookmarks);
