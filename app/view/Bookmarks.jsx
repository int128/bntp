import React from 'react';

import Bookmarks from '../repository/Bookmarks.jsx';
import Preferences from '../repository/Preferences.jsx';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: []};
  }
  componentDidMount() {
    if (localStorage.demo) {
      Bookmarks.getForDemo(items => this.setState({items: items}));
    } else {
      Bookmarks.get(items => this.setState({items: items}));
      Bookmarks.addChangeListener(() =>
        Bookmarks.loadFromChrome(items => this.setState({items: items})));
    }
  }
  render() {
    return (
      <div className="Bookmarks">
        {this.state.items.map((folder) =>
          <BookmarkFolder key={folder.id} id={folder.id} title={folder.title} items={folder.children}/>
        )}
      </div>
    );
  }
}

class BookmarkFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {collapse: false};
  }
  componentDidMount() {
    this.setState({collapse: Preferences.getFolderCollapse(this.props.id)});
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
        <section className="BookmarkFolder">
          <div className="BookmarkFolderHeadingItem">
            <a href="click: Collapse this folder" onClick={this.onClick.bind(this)}>
              {this.props.title}
            </a>
          </div>
          {this.props.items.map(item =>
            <BookmarkItem key={item.id} title={item.title} url={item.url}/>
          )}
        </section>
      );
    }
  }
}

class BookmarkItem extends React.Component {
  onClick(e) {
    if (this.props.url.startsWith('chrome://')) {
      chrome.tabs.create({url: this.props.url});
      e.preventDefault();
    }
  }
  render() {
    return (
      <div className="BookmarkItem">
        <a href={this.props.url} onClick={this.onClick.bind(this)}>
          <div className="BookmarkItemButton">
            <div className="BookmarkItemButtonBody"
              style={{backgroundImage: `url(chrome://favicon/${this.props.url})`}}>
              {this.props.title}
            </div>
          </div>
        </a>
      </div>
    );
  }
}
