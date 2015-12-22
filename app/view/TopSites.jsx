import React from 'react';

import TopSites from '../repository/TopSites.jsx';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: []};
  }
  componentDidMount() {
    if (localStorage.demo) {
      TopSites.loadDemo(items => this.setState({items: items}));
    } else {
      TopSites.loadFromChrome(items => this.setState({items: items}));
    }
  }
  render() {
    return (
      <section className="TopSites">
        <div className="TopSitesBody">
          {this.state.items.map(item =>
            <TopSiteItem key={item.url} title={item.title} url={item.url}/>
          )}
        </div>
        <div className="clearfix"/>
      </section>
    );
  }
}

class TopSiteItem extends React.Component {
  render() {
    return (
      <a href={this.props.url} className="TopSitesItem">
        <div className="TopSitesItemBody"
          style={{backgroundImage: `url(chrome://favicon/${this.props.url})`}}></div>
        <div className="TopSitesItemTip">{this.props.title}</div>
      </a>
    );
  }
}
