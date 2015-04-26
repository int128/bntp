var React = require('react');

module.exports = React.createClass({
  render: function () {
    var manifest = require('../../static/manifest.json');
    return (
      <div className="footer">
        {manifest.name} {manifest.version}
      </div>
    );
  }
});
