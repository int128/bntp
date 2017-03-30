import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Seq } from 'immutable';

import { fetchApps } from '../actions';

import { TileFolder, TileFolderItem } from '../components/Tile';

class Apps extends React.Component {
  static propTypes = {
    apps: PropTypes.instanceOf(Seq).isRequired,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApps());
  }

  render() {
    const { apps } = this.props;
    return (
      <div className="Apps">
        <TileFolder title="Chrome Apps">
          {apps.map(app =>
            <TileFolderItem key={app.id} url={`app:${app.id}`} icon={app.findLargestIcon()}>
              {app.name}
            </TileFolderItem>
          )}
        </TileFolder>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  apps: state.apps,
});

export default connect(mapStateToProps)(Apps);
