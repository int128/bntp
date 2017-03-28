import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectTheme } from '../actions';

const themes = [
  {name: 'light', title: 'Light'},
  {name: 'dark', title: 'Dark'},
  {name: 'solarized-light', title: 'Solarized Light'},
  {name: 'solarized-dark', title: 'Solarized Dark'},
];

class ThemeSelection extends React.Component {
  static propTypes = {
    selectedThemeName: PropTypes.string.isRequired,
    onSelectTheme: PropTypes.func.isRequired,
  }

  render() {
    const { selectedThemeName, onSelectTheme } = this.props;
    return (
      <div>
        {themes.map(theme =>
          <label key={theme.name}>
            <input type="radio" name="Theme"
              value={theme.name}
              checked={theme.name === selectedThemeName}
              onChange={e => onSelectTheme(theme.name)}/>
            {theme.title}
          </label>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedThemeName: state.selectedThemeName,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSelectTheme: selectedThemeName => dispatch(selectTheme(selectedThemeName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSelection);
