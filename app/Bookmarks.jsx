var React = require('react');

var BookmarksAPI = require('./BookmarksAPI.jsx');

module.exports = React.createClass({
  getInitialState: function () {
    return {items: []};
  },
  componentDidMount: function () {
    if (localStorage.demo) {
      BookmarksAPI.loadDemo(function (items) {
        this.setState({items: items});
      }.bind(this));
    } else {
      BookmarksAPI.loadFromChrome(function (items) {
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
  render: function () {
    var style = {
      backgroundImage: "url('chrome://favicon/" + this.props.url + "')"
    };
    return (
      <a href={this.props.url} className="BookmarkItem">
        <div className="BookmarkItemBody" style={style}>
          {this.props.title}
        </div>
      </a>
    );
  }
});
