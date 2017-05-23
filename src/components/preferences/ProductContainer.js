import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ProductContainer extends React.Component {
  static propTypes = {
    manifest: PropTypes.any.isRequired,
  }

  render() {
    const { manifest } = this.props;
    return (
      <div>
        <p>{manifest.name} {manifest.version}</p>
        <label>
          <a href={`https://chrome.google.com/webstore/detail/${manifest.id}`}>
            Review on Web Store
          </a>
        </label>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  manifest: state.manifest,
});

export default connect(mapStateToProps)(ProductContainer);
