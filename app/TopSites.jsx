var React = require('react');
var ChromeAPI = require('./ChromeAPI.jsx');

module.exports = React.createClass({
  getInitialState: function () {
    return {items: []};
  },
  componentDidMount: function () {
    ChromeAPI.loadTopSites(function (items) {
      this.setState({items: items});
    }.bind(this));
  },
  render: function () {
    return (
      <section className="TopSites">
        <div className="TopSitesHeading">
          <div className="TopSitesHeadingTitle">Top {this.state.items.length}</div>
        </div>
        <div className="TopSitesBody">
          {this.state.items.map(function (item) {
            return <TopSiteItem key={item.url} title={item.title} url={item.url}/>;
          })}
        </div>
      </section>
    );
  }
});

var TopSiteItem = React.createClass({
  render: function () {
    var style = {
      backgroundImage: "url('chrome://favicon/" + this.props.url + "')"
    };
    return (
      <a href={this.props.url}>
        <div className="TopSitesItem">
          <div className="TopSitesItemBody" style={style}></div>
          <div className="TopSitesItemTip">{this.props.title}</div>
        </div>
      </a>
    );
  }
});
