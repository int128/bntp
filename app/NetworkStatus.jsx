var React = require('react');

module.exports = React.createClass({
  getInitialState: function () {
    return {offline: !window.navigator.onLine};
  },
  componentDidMount: function () {
    window.addEventListener('online', function () {
      this.setState({offline: false});
    }.bind(this));
    window.addEventListener('offline', function () {
      this.setState({offline: true});
    }.bind(this));
  },
  render: function () {
    if (this.state.offline) {
      return <div className="NetworkStatus">Network is Offline</div>;
    } else {
      return <div/>;
    }
  }
});
