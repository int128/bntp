import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Theme from '../models/Theme';

import './RootThemeContainer.css';

class RootThemeContainer extends React.Component {
  static propTypes = {
    theme: PropTypes.instanceOf(Theme).isRequired,
  }

  render() {
    const { theme } = this.props;
    document.documentElement.className = `Theme__${theme.id}`;
    return null;
  }
}

const mapStateToProps = state => ({
  theme: state.appPreference.theme,
});

export default connect(mapStateToProps)(RootThemeContainer);
