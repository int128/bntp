var React = require('react');
var ChromeAPI = require('./ChromeAPI.jsx');

module.exports = React.createClass({
  getInitialState: function () {
    return {folders: []};
  },
  componentDidMount: function () {
    ChromeAPI.loadBookmarks(function (folders) {
      this.setState({folders: folders});
    }.bind(this));
  },
  render: function () {
    return (
      <div className="Bookmarks">
        {this.state.folders.map(function (folder) {
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
      <a href={this.props.url}>
        <div className="BookmarkItem">
          <div className="BookmarkItemBody" style={style}>
            {this.props.title}
          </div>
        </div>
      </a>
    );
  }
});
