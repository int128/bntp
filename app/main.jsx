var React = require('react');
var Bookmarks = require('./Bookmarks.jsx');

var Main = React.createClass({
  render: function () {
    return (
      <div className="container">
        <Bookmarks/>
      </div>
    );
  }
});

React.render(<Main/>, document.body);
