import React from 'react';

import Apps from '../repository/Apps.jsx';
import Preferences from '../repository/Preferences.jsx';

export default class extends React.Component {
  render() {
    return (
      <AppFolder id="chrome://apps" title="Chrome Apps" />
    );
  }
}

class AppFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: [], collapse: false};
  }
  componentDidMount() {
    this.setState({collapse: Preferences.getFolderCollapse(this.props.id)});
    Apps.get(items => this.setState({items: items}));
  }
  onClick(e) {
    this.setState({collapse: !this.state.collapse});
    Preferences.saveFolderCollapse(this.props.id, !this.state.collapse);
    e.preventDefault();
  }
  render() {
    if (this.state.collapse) {
      return (
        <section className="BookmarkFolder">
          <div className="BookmarkFolderHeading">
            <a href="click: Expand this folder" onClick={this.onClick.bind(this)}>
              {this.props.title}
            </a>
          </div>
        </section>
      );
    } else {
      return (
        <div className="BookmarkFolder">
          <div className="BookmarkFolderHeadingItem">
            <a href="click: Collapse this folder" onClick={this.onClick.bind(this)}>
              {this.props.title}
            </a>
          </div>
          {this.state.items.map(item =>
            <App key={item.id} id={item.id} name={item.name} icons={item.icons} />
          )}
        </div>
      );
    }
  }
}

class App extends React.Component {
  onClick(e) {
    window.chrome.management.launchApp(this.props.id);
    e.preventDefault();
  }
  render() {
    return (
      <div className="BookmarkItem">
        <a href={this.props.id} onClick={this.onClick.bind(this)}>
          <div className="BookmarkItemButton">
            <div className="BookmarkItemButtonBody"
              style={{backgroundImage: `url(${this.getLargestIcon()})`}}>
              {this.props.name}
            </div>
          </div>
        </a>
      </div>
    );
  }
  getLargestIcon() {
    if (this.props.icons && this.props.icons.length > 0) {
      return this.props.icons.sort((x, y) => x.size - y.size).pop().url;
    }
  }
}
