import React from 'react';

import { Visibility } from '../repository/Preferences.js';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {visibility: Visibility.find(props.name)};
  }
  componentDidMount() {
    Visibility.onChange(this.props.name, (value) => this.setState({visibility: value}));
  }
  render() {
    if (this.state.visibility) {
      return this.props.children;
    } else {
      return null;
    }
  }
}
