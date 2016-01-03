import React from 'react';

export default class extends React.Component {
  render() {
    return (
      <section>
        <p>Toggle</p>
        <Components
          showTopSites={this.props.showTopSites}
          showBookmarks={this.props.showBookmarks}
          onChange={this.props.onChange}
          />
      </section>
    );
  }
}

class Components extends React.Component {
  render() {
    return (
      <form>
        <label>
          <input type="checkbox"
            checked={this.props.showTopSites}
            onChange={(e) => this.props.onChange('showTopSites', e.target.checked)}/>
          Top Sites
        </label>
        <label>
          <input type="checkbox"
            checked={this.props.showBookmarks}
            onChange={(e) => this.props.onChange('showBookmarks', e.target.checked)}/>
          Bookmarks
        </label>
      </form>
    );
  }
}
