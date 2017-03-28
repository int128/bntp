import React from 'react';

import ThemeSelection from '../containers/ThemeSelection';

import Manifest from '../../public/manifest.json';

import './Preferences.css';

export default class extends React.Component {
  render() {
    const store = `https://chrome.google.com/webstore/detail/${window.chrome.runtime.id}`;
    return (
      <div className="Preferences">
        <form>
          <p>Themes</p>
          <ThemeSelection />
        </form>
        <form>
          <p>Toggle</p>
        </form>
        <form>
          <p>{Manifest.name} {Manifest.version}</p>
          <label>
            <a href={store}>Review on Web Store</a>
          </label>
        </form>
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
