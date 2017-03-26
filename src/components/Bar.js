import React, { PropTypes } from 'react';

import './Bar.css';

export class BarFolder extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className="BarFolder">
        {children}
      </div>
    );
  }
}

export class BarFolderItem extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  }

  onClick(e) {
    const { url } = this.props;
    if (url.match(/^(chrome|file|javascript):/)) {
      window.chrome.tabs.create({url: url});
      e.preventDefault();
    } else if (url.match(/^app:/)) {
      window.chrome.management.launchApp(url.substring('app:'.length));
      e.preventDefault();
    }
  }

  render() {
    const { url, icon } = this.props;
    return (
      <div className="BarFolderItem">
        <a href={url} onClick={e => this.onClick(e)}>
          <div className="BarFolderItem__Button">
            <div className="BarFolderItem__ButtonBody"
              style={{backgroundImage: `url(${icon})`}}>
            </div>
          </div>
        </a>
      </div>
    );
  }
}
