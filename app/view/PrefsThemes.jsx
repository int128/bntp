import React from 'react';

import Themes from '../repository/Themes.jsx';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.themeName};
  }
  componentDidMount() {
    Themes.findOrDefault(this.state.value).enable();
  }
  onChange(currentValue) {
    const previousValue = this.state.value;
    Themes.findOrDefault(previousValue).disable();
    Themes.findOrDefault(currentValue).enable();
    this.setState({value: currentValue});
    this.props.onChange(currentValue);
  }
  render() {
    return (
      <form>
        <p>Themes</p>
        {Themes.all().map(theme =>
          <Theme
            name={theme.name}
            title={theme.title}
            value={this.state.value}
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
