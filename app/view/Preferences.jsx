var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <section className="Preferences">
        <p>Preferences</p>
        <Themes/>
      </section>
    );
  }
});

var Themes = React.createClass({
  getInitialState: function () {
    if (localStorage.theme) {
      return {selected: localStorage.theme};
    } else {
      return {selected: 'light'};
    }
  },
  onSelected: function (name) {
    this.setState({selected: name});
    localStorage.theme = name;
  },
  render: function () {
    return (
      <div>
        <ThemeItem name="light" title="Light Theme" href="main.css"
          selected={this.state.selected}
          onSelected={this.onSelected}/>
        <ThemeItem name="dark" title="Dark Theme" href="dark.css"
          selected={this.state.selected}
          onSelected={this.onSelected}/>
      </div>
    );
  }
});

var ThemeItem = React.createClass({
  onClick: function () {
    this.props.onSelected(this.props.name);
  },
  render: function () {
    if (this.props.selected == this.props.name) {
      var loader = <link rel="stylesheet" href={this.props.href}/>;
      var className = 'selected';
    }
    return (
      <span>
        <button onClick={this.onClick} className={className}>{this.props.title}</button>
        {loader}
      </span>
    );
  }
});

