var React = require('react');
var RestClient = require('./RestClient.jsx');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      manifest: {}
    };
  },
  componentDidMount: function () {
    RestClient.get('manifest.json', function (data) {
      this.setState({manifest: data});
    }.bind(this));
  },
  render: function () {
    return <p className="footer" onDoubleClick={this.props.enableDemo}>
      {this.state.manifest.name} {this.state.manifest.version}
    </p>;
  }
});
