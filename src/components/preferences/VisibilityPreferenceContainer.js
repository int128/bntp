import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actionCreators from '../../state/visibilities/actionCreators';

import Visibilities from '../../models/Visibilities';

class VisibilityPreferenceContainer extends React.Component {
  static propTypes = {
    visibilities: PropTypes.instanceOf(Visibilities).isRequired,
  }

  componentWillMount() {
    this.props.dispatch(actionCreators.subscribeVisibilities());
  }

  componentWillUnmount() {
    this.props.dispatch(actionCreators.unsubscribeVisibilities());
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
              onChange={e => dispatch(actionCreators.toggleVisibility(visibility))}/>
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
