import React from 'react';

import Apps from '../repository/Apps.js';
import { FolderCollapse } from '../repository/Preferences.js';

import Folder from './tile/Folder.js';
import FolderItem from './tile/FolderItem.js';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: []};
    this.id = 'chrome://apps';
  }
  componentDidMount() {
    Apps.get(items => this.setState({items: items}));
  }
  onCollapse(props, collapse) {
    FolderCollapse.save(this.id, collapse);
  }
  render() {
    return (
      <div className="Apps">
        <Folder title="Chrome Apps"
                collapse={FolderCollapse.find(this.id)}
                onCollapse={this.onCollapse.bind(this)}>
          {this.state.items.map(item =>
            <FolderItem key={item.id} url={item.id} icon={findLargestIcon(item.icons)} onLaunch={launchApp}>
              {item.name}
            </FolderItem>
          )}
        </Folder>
      </div>
    );
  }
}

function launchApp(props) {
  window.chrome.management.launchApp(props.url);
}

function findLargestIcon(icons) {
  if (Array.isArray(icons) && icons.length > 0) {
    return icons.sort((x, y) => x.size - y.size).pop().url;
  }
}
