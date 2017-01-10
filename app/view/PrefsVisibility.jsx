import React from 'react';

export default class extends React.Component {
  render() {
    return (
      <form>
        <p>Toggle</p>
        <Visibility
          name="showTopSites"
          title="Top Sites"
          value={this.props.showTopSites}
          onChange={this.props.showTopSitesOnChange}/>
        <Visibility
          name="showBookmarks"
          title="Bookmarks"
          value={this.props.showBookmarks}
          onChange={this.props.showBookmarksOnChange}/>
        <Visibility
          name="showApps"
          title="Apps"
          value={this.props.showApps}
          onChange={this.props.showAppsOnChange}/>
      </form>
    );
  }
}

class Visibility extends React.Component {
  render() {
    return (
      <label>
        <input type="checkbox"
          name={this.props.name}
          checked={this.props.value}
          onChange={e => this.props.onChange(e.target.checked)}/>
        {this.props.title}
      </label>
    );
  }
}
