import React from 'react';

import TopSites from '../repository/TopSites.js';
import { Visibility } from '../repository/Preferences.js';

import Folder from './bar/Folder.js';
import FolderItem from './bar/FolderItem.js';

import FloatTip from './tip/FloatTip.js';

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
            <FloatTip key={item.url} title={item.title}>
              <FolderItem url={item.url} icon={`chrome://favicon/${item.url}`} />
            </FloatTip>
          )}
        </Folder>
      </div>
    );
  }
}
