import React from 'react';

import Bookmarks from '../repository/Bookmarks.jsx';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: []};
  }
  componentDidMount() {
    if (localStorage.demo) {
      Bookmarks.loadDemo(items => this.setState({items: items}));
    } else {
      Bookmarks.loadFromChrome(items => this.setState({items: items}));
    }
  }
  render() {
    return (
      <div className="Bookmarks">
        {this.state.items.map(function (folder) {
          return <BookmarkFolder key={folder.id} title={folder.title} items={folder.children}/>;
        })}
      </div>
    );
  }
}

class BookmarkFolder extends React.Component {
  render() {
    return (
      <section className="BookmarkFolder">
        <div className="BookmarkFolderHeading">
          <div className="BookmarkFolderHeadingTitle">{this.props.title}</div>
        </div>
        {this.props.items.map(item =>
          <BookmarkItem key={item.id} title={item.title} url={item.url}/>
        )}
      </section>
    );
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
    var style = {
      backgroundImage: `url(chrome://favicon/${this.props.url})`
    };
    return (
      <div className="BookmarkItem">
        <a href={this.props.url} onClick={this.onClick.bind(this)}>
          <div className="BookmarkItemButton">
            <div className="BookmarkItemButtonBody" style={style}>
              {this.props.title}
            </div>
          </div>
        </a>
      </div>
    );
  }
}
