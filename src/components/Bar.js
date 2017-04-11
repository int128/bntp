import React, { PropTypes } from 'react';

import { Link } from '../models';

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
    link: PropTypes.instanceOf(Link).isRequired,
  }

  onClick(e) {
    const { link } = this.props;
    if (link.isSpecial()) {
      window.chrome.tabs.create({url: link.url});
      e.preventDefault();
    } else if (link.isApp()) {
      window.chrome.management.launchApp(link.url);
      e.preventDefault();
    }
  }

  render() {
    const { link } = this.props;
    return (
      <div className="BarFolderItem">
        <a href={link.url} onClick={e => this.onClick(e)}>
          <div className="BarFolderItem__Button">
            <div className="BarFolderItem__ButtonBody"
              style={{backgroundImage: `url(${link.getIcon()})`}}>
            </div>
          </div>
        </a>
      </div>
    );
  }
}
