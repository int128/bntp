var React = require('react');
var Bookmarks = require('../repository/Bookmarks.jsx');

module.exports = React.createClass({
  getInitialState: function () {
    return {items: []};
  },
  componentDidMount: function () {
    if (localStorage.demo) {
      Bookmarks.loadDemo(function (items) {
        this.setState({items: items});
      }.bind(this));
    } else {
      Bookmarks.loadFromChrome(function (items) {
        this.setState({items: items});
      }.bind(this));
    }
  },
  render: function () {
    return (
      <div className="Bookmarks">
        {this.state.items.map(function (folder) {
          return <BookmarkFolder key={folder.id} title={folder.title} items={folder.children}/>;
        })}
      </div>
    );
  }
});

var BookmarkFolder = React.createClass({
  render: function () {
    return (
      <section className="BookmarkFolder">
        <div className="BookmarkFolderHeading">
          <div className="BookmarkFolderHeadingTitle">{this.props.title}</div>
        </div>
        <div className="BookmarkFolderBody">
          {this.props.items.map(function (item) {
            return <BookmarkItem key={item.id} title={item.title} url={item.url}/>;
          })}
        </div>
        <div className="clearfix"/>
      </section>
    );
  }
});

var BookmarkItem = React.createClass({
  faviconUrl: function () {
    return 'chrome://favicon/' + this.props.url;
  },
  render: function () {
    return (
      <BookmarkLink href={this.props.url} className="BookmarkItem">
        <div className="BookmarkItemBody" style={{backgroundImage: "url(" + this.faviconUrl() + ")"}}>
          {this.props.title}
        </div>
      </BookmarkLink>
    );
  }
});

var BookmarkLink = React.createClass({
  open: function (e) {
    chrome.tabs.create({url: this.props.href});
    e.preventDefault();
  },
  render: function () {
    if (this.props.href.startsWith('chrome://')) {
      return (
        <a onClick={this.open} {...this.props}>
          {this.props.children}
        </a>
      );
    } else {
      return (
        <a {...this.props}>
          {this.props.children}
        </a>
      );
    }
  }
});
