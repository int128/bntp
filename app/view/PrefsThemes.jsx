import React from 'react';

import Preferences from '../repository/Preferences.jsx';
import Themes from '../repository/Themes.jsx';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {theme: Themes.findOrDefault(Preferences.getThemeName())};
  }
  componentDidMount() {
    this.state.theme.apply();
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
          defaultChecked={this.props.name == this.props.value}
          onChange={(e) => this.props.onChange(e.target.value)}/>
        {this.props.title}
      </label>
    );
  }
}
