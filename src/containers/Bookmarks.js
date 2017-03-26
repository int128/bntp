import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchBookmarks, toggleFolderCollapse } from '../actions';

import { TileFolder, TileFolderItem } from '../components/Tile';

class Bookmarks extends React.Component {
  static propTypes = {
    bookmarkFolders: PropTypes.array.isRequired,
    collapsedFolderIds: PropTypes.arrayOf(PropTypes.string).isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchBookmarks());
  }

  render() {
    const { dispatch, bookmarkFolders, collapsedFolderIds } = this.props;
    return (
      <div className="Bookmarks">
        {bookmarkFolders.map(folder =>
          <TileFolder key={folder.id} title={folder.title}
                      collapsed={collapsedFolderIds.indexOf(folder.id) >= 0}
                      onToggle={collapsed => dispatch(toggleFolderCollapse(folder.id, collapsed))}>
            {folder.children.map(item =>
              <TileFolderItem key={item.id} url={item.url} icon={`chrome://favicon/${item.url}`}>
                {item.title}
              </TileFolderItem>
            )}
          </TileFolder>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bookmarkFolders: state.bookmarkFolders,
    collapsedFolderIds: state.collapsedFolderIds
  };
}

export default connect(mapStateToProps)(Bookmarks);
