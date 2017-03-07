import React from 'react';

import TopSites from '../repository/TopSites.js';

import Folder from './bar/Folder.js';
import FolderItem from './bar/FolderItem.js';

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
      <div className="TopSites">
        <Folder>
          {this.state.items.map(item =>
            <FolderItem key={item.url} url={item.url} icon={`chrome://favicon/${item.url}`}>
              {item.title}
            </FolderItem>
          )}
        </Folder>
      </div>
    );
  }
}
