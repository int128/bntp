import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Seq } from 'immutable';

import { selectTheme } from '../../actions';

import Theme from '../../models/preferences/Theme';

class ThemeSelectionContainer extends React.Component {
  static propTypes = {
    themes: PropTypes.instanceOf(Seq).isRequired,
    selectedTheme: PropTypes.instanceOf(Theme),
  }

  render() {
    const { themes, selectedTheme, dispatch } = this.props;
    return (
      <div>
        {themes.map(theme =>
          <label key={theme.id}>
            <input type="radio" name="Theme"
              value={theme.id}
              checked={theme.equals(selectedTheme)}
              onChange={e => dispatch(selectTheme(theme))}/>
            {theme.title}
          </label>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  themes: state.themes,
  selectedTheme: state.selectedTheme,
});

export default connect(mapStateToProps)(ThemeSelectionContainer);
