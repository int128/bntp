import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actionCreators from '../../state/preferences/actionCreators';

import AppPreference from '../../models/AppPreference';

class AppPreferenceContainer extends React.Component {
  static propTypes = {
    appPreference: PropTypes.instanceOf(AppPreference).isRequired,
  }

  setAppPreference(map) {
    this.props.dispatch(actionCreators.setAppPreference(map));
  }

  render() {
    const { appPreference } = this.props;
    return (
      <div>
        <label>
          <input type="checkbox"
            checked={appPreference.indentFolders}
            onChange={e => this.setAppPreference({indentFolders: e.target.checked})}/>
          Indent Folders
        </label>

        <label>
          <input type="checkbox"
            checked={appPreference.showSearchField}
            onChange={e => this.setAppPreference({showSearchField: e.target.checked})}/>
          Search
        </label>

        <label>
          <input type="checkbox"
            checked={appPreference.showBookmarks}
            onChange={e => this.setAppPreference({showBookmarks: e.target.checked})}/>
          Bookmarks
        </label>
        <label>
          <input type="checkbox"
            checked={appPreference.showTopSites}
            onChange={e => this.setAppPreference({showTopSites: e.target.checked})}/>
          Top Sites
        </label>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  appPreference: state.appPreference,
});

export default connect(mapStateToProps)(AppPreferenceContainer);
