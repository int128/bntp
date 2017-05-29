import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  toggleVisibility,
  subscribeVisibilities,
  unsubscribeVisibilities
} from '../../actions/preferences';

import Visibilities from '../../models/preferences/Visibilities';

class VisibilityPreferenceContainer extends React.Component {
  static propTypes = {
    visibilities: PropTypes.instanceOf(Visibilities).isRequired,
  }

  componentWillMount() {
    this.props.dispatch(subscribeVisibilities());
  }

  componentWillUnmount() {
    this.props.dispatch(unsubscribeVisibilities());
  }

  render() {
    const { visibilities, dispatch } = this.props;
    return (
      <div>
        {visibilities.map(visibility =>
          <label key={visibility.id}>
            <input type="checkbox"
              name={visibility.id}
              checked={visibility.visible}
              onChange={e => dispatch(toggleVisibility(visibility))}/>
            {visibility.title}
          </label>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  visibilities: state.visibilities,
});

export default connect(mapStateToProps)(VisibilityPreferenceContainer);
