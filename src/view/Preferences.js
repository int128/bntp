import React from 'react';

import Themes from '../repository/Themes.js';
import { Visibility, CurrentTheme } from '../repository/Preferences.js';

export default class extends React.Component {
  render() {
    return (
      <div className="Preferences">
        <form>
          <p>Themes</p>
          <ThemeSelection />
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
    this.state = {selected: CurrentTheme.find()};
  }
  componentDidMount() {
    CurrentTheme.onChange((selected) => this.setState({selected: selected}));
  }
  onChange(selected) {
    CurrentTheme.save(selected);
  }
  render() {
    return (
      <div>
        {Themes.findAll().map(theme =>
          <label key={theme.name}>
            <input type="radio" name="Theme"
              value={theme.name}
              checked={this.state.selected === theme.name}
              onChange={(e) => this.onChange(theme.name)}/>
            {theme.title}
          </label>
        )}
      </div>
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
