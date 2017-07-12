import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Seq } from 'immutable';

import * as actionCreators from '../../state/preferences/actionCreators';

import Purchase from '../../models/Purchase';

class ManifestContainer extends React.Component {
  static propTypes = {
    manifest: PropTypes.any.isRequired,
    purchases: PropTypes.arrayOf(PropTypes.instanceOf(Purchase)).isRequired,
  }

  onDonationClick(e) {
    e.preventDefault();
    this.props.dispatch(actionCreators.makeDonation());
  }

  render() {
    const { manifest, purchases } = this.props;
    return (
      <div>
        <p>{manifest.name} {manifest.version}</p>
        <p>
          Thank you for using the app.
        </p>
        <a href={`https://chrome.google.com/webstore/detail/${manifest.id}`}>
          <label>Review on Web Store</label>
        </a>
        <button onClick={e => this.onDonationClick(e)}>
          Make a Donation
          {Seq(purchases).map(purchase => ' ★').join('')}
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  manifest: state.manifest,
  purchases: state.purchases,
});

export default connect(mapStateToProps)(ManifestContainer);
