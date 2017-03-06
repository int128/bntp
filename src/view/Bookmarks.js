import React from 'react';

import Bookmarks from '../repository/Bookmarks.js';
import Preferences from '../repository/Preferences.js';

import Folder from './tile/Folder.js';
import FolderItem from './tile/FolderItem.js';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: []};
  }
  componentDidMount() {
    if (localStorage.demo) {
      Bookmarks.getForDemo(items => this.setState({items: items}));
    } else {
      Bookmarks.get(items => this.setState({items: items}));
      Bookmarks.addChangeListener(() =>
        Bookmarks.loadFromChrome(items => this.setState({items: items})));
    }
  }
  onCollapse(props, collapse) {
    Preferences.saveFolderCollapse(props.id, collapse);
  }
  render() {
    return (
      <div className="Bookmarks">
        {this.state.items.map(folder =>
          <Folder key={folder.id}
                  id={folder.id}
                  title={folder.title}
                  collapse={Preferences.getFolderCollapse(folder.id)}
                  onCollapse={this.onCollapse.bind(this)}>
            {folder.children.map(item =>
              <FolderItem key={item.id} url={item.url} icon={`chrome://favicon/${item.url}`}>
                {item.title}
              </FolderItem>
            )}
          </Folder>
        )}
      </div>
    );
  }
}
