import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchTopSites } from '../actions';

import { BarFolder, BarFolderItem } from '../components/Bar';

class TopSites extends React.Component {
  static propTypes = {
    topSites: PropTypes.array.isRequired,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTopSites());
  }

  render() {
    const { dispatch, topSites } = this.props;
    return (
      <div className="TopSites">
        <BarFolder>
          {topSites.map(topSite =>
            <BarFolderItem key={topSite.url} url={topSite.url} icon={`chrome://favicon/${topSite.url}`} />
          )}
        </BarFolder>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    topSites: state.topSites,
  };
}

export default connect(mapStateToProps)(TopSites);
