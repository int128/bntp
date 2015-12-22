import React from 'react';

import ClearFix from './ClearFix.jsx';

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
        <ClearFix/>
      </section>
    );
  }
}

class TopSiteItem extends React.Component {
  render() {
    return (
      <div className="TopSitesItem">
        <a href={this.props.url}>
          <div className="TopSitesItemButton">
            <div className="TopSitesItemButtonBody"
              style={{backgroundImage: `url(chrome://favicon/${this.props.url})`}}></div>
          </div>
        </a>
        <div className="TopSitesItemTip">
          <div className="TopSitesItemTipBody">
            {this.props.title}
          </div>
        </div>
      </div>
    );
  }
}
