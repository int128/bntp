import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Seq } from 'immutable';

import * as bookmarksActionCreators from '../../state/bookmarks/actionCreators';
import * as folderPreferencesActionCreators from '../../state/folderPreferences/actionCreators';

import TileFolder from '../kits/TileFolder';
import TileFolderItem from '../kits/TileFolderItem';

import FolderPreference from '../../models/FolderPreference';
import BookmarkPreference from '../../models/BookmarkPreference';

class FoldersContainer extends React.Component {
  static propTypes = {
    folders: PropTypes.instanceOf(Seq).isRequired,
    folderPreference: PropTypes.instanceOf(FolderPreference).isRequired,
    bookmarkPreference: PropTypes.instanceOf(BookmarkPreference).isRequired,
  }

  componentWillMount() {
    this.props.dispatch(folderPreferencesActionCreators.subscribeFolderPreferences());
  }

  componentWillUnmount() {
    this.props.dispatch(folderPreferencesActionCreators.unsubscribeFolderPreferences());
  }

  render() {
    const { dispatch, folders, folderPreference, bookmarkPreference } = this.props;
    return (
      <div>
        {folders.map(folder =>
          <TileFolder key={folder.id}
                      title={folder.title}
                      collapsed={folderPreference.isCollapse(folder)}
                      onToggle={collapsed => dispatch(folderPreferencesActionCreators.toggleFolderCollapse(folder))}>
            {folder.items.map(item =>
              <TileFolderItem key={item.id}
                              link={item.link}
                              badge={bookmarkPreference.getAccessKey(item)}
                              canEdit={item.canEdit}
                              editClick={e => dispatch(bookmarksActionCreators.openBookmarkEdit(item))}>
                {item.title}
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
  bookmarkPreference: state.bookmarkPreference,
});

export default connect(mapStateToProps)(FoldersContainer);
