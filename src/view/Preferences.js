import React from 'react';

import Themes from '../repository/Themes.js';
import { Visibility, CurrentTheme } from '../repository/Preferences.js';

export default class extends React.Component {
  render() {
    return (
      <div className="Preferences">
        <form>
          <p>Themes</p>
          {Themes.findAll().map(theme =>
            <ThemeSelection key={theme.name} name={theme.name}>
              {theme.title}
            </ThemeSelection>
          )}
        </form>
        <form>
          <p>Toggle</p>
          <VisibilityToggle name="TopSites">
            Top Sites
          </VisibilityToggle>
          <VisibilityToggle name="Bookmarks">
            Bookmarks
          </VisibilityToggle>
          <VisibilityToggle name="Apps">
            Apps
          </VisibilityToggle>
        </form>
      </div>
    );
  }
}

class ThemeSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {checked: CurrentTheme.find(props.name)};
  }
  render() {
    return (
      <label>
        <input type="radio"
          name="Theme"
          value={this.props.name}
          checked={this.state.checked}
          onChange={e => this.onChange(e.target.value)}/>
        {this.props.children}
      </label>
    );
  }
}

class VisibilityToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {checked: Visibility.find(props.name)};
  }
  componentDidMount() {
    Visibility.onChange(this.props.name, (checked) => this.setState({checked: checked}));
  }
  onChange(e) {
    Visibility.save(this.props.name, e.target.checked);
  }
  render() {
    return (
      <label>
        <input type="checkbox"
          name={this.props.name}
          checked={this.state.checked}
          onChange={this.onChange.bind(this)}/>
        {this.props.children}
      </label>
    );
  }
}
