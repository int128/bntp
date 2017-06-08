import React from 'react';
import PropTypes from 'prop-types';

import Link from '../../models/Link';

import './Bar.css';

export default class BarFolderItem extends React.Component {
  static propTypes = {
    link: PropTypes.instanceOf(Link).isRequired,
    onLinkClick: PropTypes.func.isRequired,
  }

  onLinkClick(e) {
    e.preventDefault();
    this.props.onLinkClick();
  }

  render() {
    const { link } = this.props;
    return (
      <div className="BarFolderItem">
        <a href={link.url} onClick={e => this.onLinkClick(e)}>
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
