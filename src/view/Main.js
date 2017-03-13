import React from 'react';

import NetworkStatus from './NetworkStatus.js';

import Togglable from './Togglable.js';
import TopSites from './TopSites.js';
import Apps from './Apps.js';
import Bookmarks from './Bookmarks.js';
import Preferences from './Preferences.js';

import { CurrentTheme } from '../repository/Preferences.js';

import './Main.css';

export default class extends React.Component {
  render() {
    return (
      <ThemeDecorated>
        <div className="Main">
          <NetworkStatus/>
          <Togglable name="TopSites">
            <TopSites />
          </Togglable>
          <Togglable name="Bookmarks">
            <Bookmarks />
          </Togglable>
          <Togglable name="Apps">
            <Apps />
          </Togglable>
          <Preferences />
        </div>
      </ThemeDecorated>
    );
  }
}

class ThemeDecorated extends React.Component {
  constructor(props) {
    super(props);
    this.state = {theme: CurrentTheme.find()};
  }
  componentDidMount() {
    CurrentTheme.onChange((theme) => this.setState({theme: theme}));
  }
  render() {
    return (
      <div className={`theme-${this.state.theme}`}>
        {this.props.children}
      </div>
    );
  }
}
