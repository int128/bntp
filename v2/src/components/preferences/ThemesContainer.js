import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actionCreators from '../../state/preferences/actionCreators';

import { THEMES } from '../../models/Themes';
import Theme from '../../models/Theme';

class ThemesContainer extends React.Component {
  static propTypes = {
    selectedTheme: PropTypes.instanceOf(Theme).isRequired,
  }

  render() {
    const { selectedTheme, dispatch } = this.props;
    return (
      <div>
        {THEMES.map(theme =>
          <label key={theme.id}>
            <input type="radio" name="Theme"
              value={theme.id}
              checked={theme.id === selectedTheme.id}
              onChange={e => dispatch(actionCreators.setAppPreference({theme}))}/>
            {theme.title}
          </label>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedTheme: state.appPreference.theme,
});

export default connect(mapStateToProps)(ThemesContainer);
