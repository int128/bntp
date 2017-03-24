import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchBookmarks, toggleFolderCollapse } from '../actions';

import { TileFolder, TileFolderItem } from '../components/Tile';

class Bookmarks extends React.Component {
  static propTypes = {
    bookmarkFolders: PropTypes.array.isRequired,
    collapsedFolders: PropTypes.array.isRequired
  }

  componentDidMount() {
    this.props.dispatch(fetchBookmarks);
  }

  render() {
    const { dispatch, bookmarkFolders, collapsedFolders } = this.props;
    return (
      <div className="Bookmarks">
        {bookmarkFolders.map(folder =>
          <TileFolder key={folder.id} title={folder.title}
                      collapsed={collapsedFolders.indexOf(folder) >= 0}
                      onToggle={collapsed => dispatch(toggleFolderCollapse(folder, collapsed))}>
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
    collapsedFolders: state.collapsedFolders
  };
}

export default connect(mapStateToProps)(Bookmarks);
