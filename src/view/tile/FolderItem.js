import React from 'react';

import './index.css';

export default class extends React.Component {
  onClick(e) {
    if (this.props.onLaunch) {
      this.props.onLaunch.call(null, this.props);
      e.preventDefault();
    } else if (this.props.url.match(/^(chrome|file|javascript):/)) {
      window.chrome.tabs.create({url: this.props.url});
      e.preventDefault();
    }
  }
  render() {
    return (
      <div className="TileFolderItem">
        <a href={this.props.url} onClick={this.onClick.bind(this)}>
          <div className="TileFolderItem__Button">
            <div className="TileFolderItem__ButtonBody"
              style={{backgroundImage: `url(${this.props.icon})`}}>
              {this.props.children}
            </div>
          </div>
        </a>
      </div>
    );
  }
}
