var React = require('react');

module.exports = React.createClass({
  render: function () {
    var manifest = require('../static/manifest.json');
    return <p className="footer" onDoubleClick={this.props.enableDemo}>
      {manifest.name} {manifest.version}
    </p>;
  }
});
