var React = require('react');

module.exports = React.createClass({
  render: function () {
    var manifest = require('../../static/manifest.json');
    return (
      <section className="footer">
        <p>{manifest.name} {manifest.version}</p>
      </section>
    );
  }
});
