import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ManifestContainer extends React.Component {
  static propTypes = {
    manifest: PropTypes.any.isRequired,
  }

  render() {
    const { manifest } = this.props;
    return (
      <div>
        <p>{manifest.name} {manifest.version}</p>
        <a href={`https://chrome.google.com/webstore/detail/${manifest.id}`}>
          <label>Review on Web Store</label>
        </a>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  manifest: state.manifest,
});

export default connect(mapStateToProps)(ManifestContainer);
