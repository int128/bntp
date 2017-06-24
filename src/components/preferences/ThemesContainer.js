import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actionCreators from '../../state/preferences/actionCreators';

import Themes from '../../models/Themes';

class ThemesContainer extends React.Component {
  static propTypes = {
    themes: PropTypes.instanceOf(Themes).isRequired,
  }

  render() {
    const { themes, dispatch } = this.props;
    return (
      <div>
        {themes.map(theme =>
          <label key={theme.id}>
            <input type="radio" name="Theme"
              value={theme.id}
              checked={theme.selected}
              onChange={e => dispatch(actionCreators.selectTheme(theme))}/>
            {theme.title}
          </label>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  themes: state.themes,
});

export default connect(mapStateToProps)(ThemesContainer);
