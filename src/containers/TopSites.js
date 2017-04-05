import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Seq } from 'immutable';

import { fetchTopSites } from '../actions';

import { BarFolder, BarFolderItem } from '../components/Bar';
import { FloatTip } from '../components/Tip';

class TopSites extends React.Component {
  static propTypes = {
    topSites: PropTypes.instanceOf(Seq).isRequired,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTopSites());
  }

  render() {
    const { topSites } = this.props;
    return (
      <div className="TopSites">
        <BarFolder>
          {topSites.map(topSite =>
            <FloatTip key={topSite.url} title={topSite.title}>
              <BarFolderItem url={topSite.url} icon={topSite.getIcon()} />
            </FloatTip>
          )}
        </BarFolder>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  topSites: state.topSites,
});

export default connect(mapStateToProps)(TopSites);
