var React = require('react');

module.exports = React.createClass({
  render: function () {
    var manifest = require('../../static/manifest.json');
    return (
      <section className="Footer">
        <p>{manifest.name} {manifest.version}</p>
      </section>
    );
  }
});
