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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  appPreference: state.appPreference,
});

export default connect(mapStateToProps)(AppPreferenceContainer);
