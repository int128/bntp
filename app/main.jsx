var React = require('react');

var TopSites = require('./TopSites.jsx');
var Bookmarks = require('./Bookmarks.jsx');
var Footer = require('./Footer.jsx');

var TopSitesAPI = require('./TopSitesAPI.jsx');
var BookmarksAPI = require('./BookmarksAPI.jsx');

var Main = React.createClass({
  getInitialState: function () {
    return {
      topSites: [],
      bookmarks: []
    };
  },
  componentDidMount: function () {
    TopSitesAPI.loadFromChrome(function (items) {
      this.setState({topSites: items});
    }.bind(this));
    BookmarksAPI.loadFromChrome(function (items) {
      this.setState({bookmarks: items});
    }.bind(this));
  },
  enableDemo: function () {
    TopSitesAPI.loadDemo(function (items) {
      this.setState({topSites: items});
    }.bind(this));
    BookmarksAPI.loadDemo(function (items) {
      this.setState({bookmarks: items});
    }.bind(this));
  },
  render: function () {
    return (
      <div className="container">
        <TopSites items={this.state.topSites} />
        <Bookmarks items={this.state.bookmarks} />
        <Footer enableDemo={this.enableDemo} />
      </div>
    );
  }
});

React.render(<Main/>, document.body);
