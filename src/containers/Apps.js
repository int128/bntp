import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchApps, toggleFolderCollapse } from '../actions';

import { TileFolder, TileFolderItem } from '../components/Tile';

class Apps extends React.Component {
  static propTypes = {
    apps: PropTypes.array.isRequired,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApps());
  }

  render() {
    const { dispatch, apps, collapsedFolderIds } = this.props;
    const folderId = 'chrome://apps';
    return (
      <div className="Apps">
        <TileFolder title="Chrome Apps"
                    collapsed={collapsedFolderIds.indexOf(folderId) >= 0}
                    onToggle={collapsed => dispatch(toggleFolderCollapse(folderId, collapsed))}>
          {apps.map(app =>
            <TileFolderItem key={app.id} url={`app:${app.id}`} icon={findLargestIcon(app.icons)}>
              {app.name}
            </TileFolderItem>
          )}
        </TileFolder>
      </div>
    );
  }
}

function findLargestIcon(icons) {
  if (Array.isArray(icons) && icons.length > 0) {
    const laregstSize = Math.max(...icons.map(icon => icon.size));
    return icons.find(icon => icon.size === laregstSize).url;
  } else {
    return 'chrome://favicon/';
  }
}

function mapStateToProps(state) {
  return {
    apps: state.apps,
    collapsedFolderIds: state.collapsedFolderIds
  };
}

export default connect(mapStateToProps)(Apps);
