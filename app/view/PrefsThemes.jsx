import React from 'react';

import LightTheme from '../theme/light.less';
import DarkTheme from '../theme/dark.less';
import SolarizedLightTheme from '../theme/solarized-light.less';
import SolarizedDarkTheme from '../theme/solarized-dark.less';

export default class extends React.Component {
  constructor(props) {
    super(props);
    const defaultItem = ThemeItems.find(this.props.themeName) || ThemeItems.getDefault();
    this.state = {value: defaultItem.value};
  }
  componentDidMount() {
    ThemeItems.find(this.state.value).style.use();
  }
  onChange(currentValue) {
    const previousValue = this.state.value;
    ThemeItems.find(previousValue).style.unuse();
    ThemeItems.find(currentValue).style.use();
    this.setState({value: currentValue});
    this.props.onChange(currentValue);
  }
  render() {
    return (
      <section>
        <p>Themes</p>
        <ThemeForm items={ThemeItems.all()} defaultValue={this.state.value}
          onChange={this.onChange.bind(this)}/>
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
