var React = require('react');
var TopSites = require('./TopSites.jsx');
var Bookmarks = require('./Bookmarks.jsx');

var Main = React.createClass({
  render: function () {
    return (
      <div className="container">
        <TopSites/>
        <Bookmarks/>
      </div>
    );
  }
});

React.render(<Main/>, document.body);
