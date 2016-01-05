import React from 'react';

import Manifest from '../../static/manifest.json';

export default class extends React.Component {
  render() {
    const store = `https://chrome.google.com/webstore/detail/${chrome.runtime.id}`;
    return (
      <section className="Footer">
        <p><a href={store}>{Manifest.name}</a> {Manifest.version}</p>
      </section>
    );
  }
}
