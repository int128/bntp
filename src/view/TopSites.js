import React from 'react';

import TopSites from '../repository/TopSites.js';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: []};
  }
  componentDidMount() {
    if (localStorage.demo) {
      TopSites.getForDemo(items => this.setState({items: items}));
    } else {
      TopSites.get(items => this.setState({items: items}));
    }
  }
  render() {
    return (
      <div>
        <div className="TopSitesFixed">
          <section className="TopSites">
            {this.state.items.map(item =>
              <TopSiteItem key={item.url} title={item.title} url={item.url}/>
            )}
          </section>
        </div>
        <div className="TopSitesMargin"></div>
      </div>
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
