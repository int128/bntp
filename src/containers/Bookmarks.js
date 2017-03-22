import React from 'react';
import { connect } from 'react-redux';

import { fetchBookmarks } from '../actions';

import Folder from '../view/tile/Folder';
import FolderItem from '../view/tile/FolderItem';

class Bookmarks extends React.Component {
  static propTypes = {
    folders: React.PropTypes.array.isRequired,
  }

  componentDidMount() {
    this.props.dispatch(fetchBookmarks);
  }

  render() {
    return (
      <div className="Bookmarks">
        {this.props.folders.map(folder =>
          <Folder key={folder.id}
                  id={folder.id}
                  title={folder.title}>
            {folder.children.map(item =>
              <FolderItem key={item.id} url={item.url} icon={`chrome://favicon/${item.url}`}>
                {item.title}
              </FolderItem>
            )}
          </Folder>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    folders: state.bookmarks.folders
  };
}

export default connect(mapStateToProps)(Bookmarks);
