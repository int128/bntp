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
          onChange={this.props.onChange}/>
        <Visibility
          name="showBookmarks"
          title="Bookmarks"
          value={this.props.showBookmarks}
          onChange={this.props.onChange}/>
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
          onChange={(e) => this.props.onChange(this.props.name, e.target.checked)}/>
        {this.props.title}
      </label>
    );
  }
}
