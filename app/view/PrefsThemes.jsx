import React from 'react';

import Preferences from '../repository/Preferences.jsx';

import LightTheme from '../theme/light.less';
import DarkTheme from '../theme/dark.less';
import SolarizedLightTheme from '../theme/solarized-light.less';
import SolarizedDarkTheme from '../theme/solarized-dark.less';

export default class extends React.Component {
  render() {
    return (
      <section>
        <p>Themes</p>
        <Themes/>
      </section>
    );
  }
}

const ThemeItems = {
  _items: [
    {value: 'light', title: 'Light', style: LightTheme},
    {value: 'dark',  title: 'Dark', style: DarkTheme},
    {value: 'solarized-light', title: 'Solarized Light', style: SolarizedLightTheme},
    {value: 'solarized-dark', title: 'Solarized Dark', style: SolarizedDarkTheme},
  ],
  all() {
    return this._items;
  },
  find(value) {
    return this._items.find(item => item.value == value);
  },
  getDefault() {
    return this._items[0];
  }
};

class Themes extends React.Component {
  constructor(props) {
    super(props);
    const defaultItem = ThemeItems.find(Preferences.getThemeName()) || ThemeItems.getDefault();
    this.state = {value: defaultItem.value};
  }
  componentDidMount() {
    ThemeItems.find(this.state.value).style.use();
  }
  onChange(currentValue) {
    const previousValue = this.state.value;
    this.setState({value: currentValue});
    Preferences.setThemeName(currentValue);
    ThemeItems.find(previousValue).style.unuse();
    ThemeItems.find(currentValue).style.use();
  }
  render() {
    return (
      <ThemeForm items={ThemeItems.all()} defaultValue={this.state.value}
        onChange={this.onChange.bind(this)}/>
    );
  }
}

class ThemeForm extends React.Component {
  onChange(e) {
    this.props.onChange(e.target.value);
  }
  render() {
    return (
      <form className="Themes">
        {this.props.items.map(item =>
          <label>
            <input type="radio" name="Theme" value={item.value}
              defaultChecked={item.value == this.props.defaultValue}
              onChange={this.onChange.bind(this)}/>
            {item.title}
          </label>
        )}
      </form>
    );
  }
}
