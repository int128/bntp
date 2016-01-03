import React from 'react';

import ThemeItems from '../repository/Themes.jsx';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.themeName};
  }
  componentDidMount() {
    ThemeItems.findOrDefault(this.state.value).enable();
  }
  onChange(currentValue) {
    const previousValue = this.state.value;
    ThemeItems.findOrDefault(previousValue).disable();
    ThemeItems.findOrDefault(currentValue).enable();
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

class ThemeForm extends React.Component {
  render() {
    return (
      <form className="Themes">
        {this.props.items.map(item =>
          <label>
            <input type="radio" name="Theme" value={item.name}
              defaultChecked={item.name == this.props.defaultValue}
              onChange={(e) => this.props.onChange(e.target.value)}/>
            {item.title}
          </label>
        )}
      </form>
    );
  }
}
