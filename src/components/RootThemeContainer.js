import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Theme from '../models/Theme';

import './RootThemeContainer.css';

class RootThemeContainer extends React.Component {
  static propTypes = {
    theme: PropTypes.instanceOf(Theme).isRequired,
  }

  componentDidMount() {
    document.documentElement.className = `Theme__${this.props.theme.id}`;
  }

  componentDidUpdate() {
    document.documentElement.className = `Theme__${this.props.theme.id}`;
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  theme: state.appPreference.theme,
});

export default connect(mapStateToProps)(RootThemeContainer);
