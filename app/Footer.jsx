var React = require('react');

module.exports = React.createClass({
  getInitialState: function () {
    return {clicked: 1};
  },
  handleClick: function () {
    if (this.state.clicked >= 3) {
      this.props.enableDemo();
    } else {
      this.setState({clicked: this.state.clicked + 1});
    }
    return false;
  },
  render: function () {
    var manifest = require('../static/manifest.json');
    return (
      <div className="footer">
        <a href="#" onClick={this.handleClick}>
          {manifest.name} {manifest.version}
        </a>
      </div>
    );
  }
});
