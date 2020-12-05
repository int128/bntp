import React from 'react';
import PropTypes from 'prop-types';

import Link from './Link';

import './Bar.css';

export default class BarFolderItem extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    onLinkClick: PropTypes.func.isRequired,
  }

  render() {
    const { url, icon, onLinkClick } = this.props;
    return (
      <div className="BarFolderItem">
        <Link url={url} onClick={e => onLinkClick(e)}>
          <div className="BarFolderItem__Button">
            <div className="BarFolderItem__ButtonBody" style={{backgroundImage: `url(${icon})`}}>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
