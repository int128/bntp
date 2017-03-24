import React from 'react';
import { connect } from 'react-redux';

import { fetchBookmarks, toggleFolderCollapse } from '../actions';

import { TileFolder, TileFolderItem } from '../components/Tile';

class Bookmarks extends React.Component {
  static propTypes = {
    folders: React.PropTypes.array.isRequired,
  }

  componentDidMount() {
    this.props.dispatch(fetchBookmarks);
  }

  render() {
    const { dispatch, folders, collapsedFolders } = this.props;
    return (
      <div className="Bookmarks">
        {folders.map(folder =>
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
    folders: state.bookmarks.folders,
    collapsedFolders: state.collapsedFolders
  };
}

export default connect(mapStateToProps)(Bookmarks);
