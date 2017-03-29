import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectTheme } from '../actions';

import { Themes, Theme } from '../models/Themes';

class ThemeSelection extends React.Component {
  static propTypes = {
    selectedTheme: PropTypes.instanceOf(Theme).isRequired,
    onSelectTheme: PropTypes.func.isRequired,
  }

  render() {
    const { selectedTheme, onSelectTheme } = this.props;
    return (
      <div>
        {Themes.findAll().map(theme =>
          <label key={theme.name}>
            <input type="radio" name="Theme"
              value={theme.name}
              checked={theme.name === selectedTheme.name}
              onChange={e => onSelectTheme(theme)}/>
            {theme.title}
          </label>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedTheme: Themes.findOrDefault(state.selectedThemeName),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSelectTheme: selectedTheme => dispatch(selectTheme(selectedTheme)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSelection);
