import React from 'react';

import './index.css';

export default class extends React.Component {
  render() {
    return (
      <div className="BarFolderItem">
        <a href={this.props.url}>
          <div className="BarFolderItem__Button">
            <div className="BarFolderItem__ButtonBody"
              style={{backgroundImage: `url(${this.props.icon})`}}>
            </div>
          </div>
        </a>
      </div>
    );
  }
}
