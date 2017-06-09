import React from 'react';
import PropTypes from 'prop-types';

import './Bar.css';

export default class BarFolderItem extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    onLinkClick: PropTypes.func.isRequired,
  }

  onLinkClick(e) {
    e.preventDefault();
    this.props.onLinkClick();
  }

  render() {
    const { url, icon } = this.props;
    return (
      <div className="BarFolderItem">
        <a href={url} onClick={e => this.onLinkClick(e)}>
          <div className="BarFolderItem__Button">
            <div className="BarFolderItem__ButtonBody" style={{backgroundImage: `url(${icon})`}}>
            </div>
          </div>
        </a>
      </div>
    );
  }
}
