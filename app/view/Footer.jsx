import React from 'react';

import Manifest from '../../static/manifest.json';

export default class extends React.Component {
  render() {
    return (
      <section className="Footer">
        <p>{Manifest.name} {Manifest.version}</p>
      </section>
    );
  }
}
