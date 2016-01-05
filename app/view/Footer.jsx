import React from 'react';

import Manifest from '../../static/manifest.json';

export default class extends React.Component {
  render() {
    const store = `https://chrome.google.com/webstore/detail/${chrome.runtime.id}`;
    return (
      <section className="Footer">
        <form>
          <p>{Manifest.name} {Manifest.version}</p>
          <label>
            <a href={store}>Review on Web Store</a>
          </label>
        </form>
      </section>
    );
  }
}
