import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Seq } from 'immutable';

import { toggleVisibility } from '../actions';

import { Visibilities } from '../models';

class VisibilityPreference extends React.Component {
  static propTypes = {
    visibilities: PropTypes.instanceOf(Visibilities).isRequired,
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

export default connect(mapStateToProps)(VisibilityPreference);
