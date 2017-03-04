import React from 'react';

import Preferences from '../repository/Preferences.js';
import Themes from '../repository/Themes.js';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {theme: Themes.getDefault()};
  }
  componentDidMount() {
    this.onChange(Preferences.getThemeName());
  }
  onChange(name) {
    const theme = Themes.findOrDefault(name);
    theme.apply();
    this.setState({theme: theme});
    Preferences.saveThemeName(theme.name);
  }
  render() {
    return (
      <form>
        <p>Themes</p>
        {Themes.findAll().map(theme =>
          <Theme
            key={theme.name}
            name={theme.name}
            title={theme.title}
            value={this.state.theme.name}
            onChange={this.onChange.bind(this)}/>
        )}
      </form>
    );
  }
}

class Theme extends React.Component {
  render() {
    return (
      <label>
        <input type="radio"
          name="Theme"
          value={this.props.name}
          checked={this.props.name == this.props.value}
          onChange={e => this.props.onChange(e.target.value)}/>
        {this.props.title}
      </label>
    );
  }
}
