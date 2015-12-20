var React = require('react');

var Preferences = require('../repository/Preferences.jsx');

module.exports = React.createClass({
  onThemeChange: function (item) {
    Preferences.setThemeName(item.name);
    this.renderStylesheet(item.stylesheet);
  },
  renderStylesheet: function (stylesheet) {
    document.getElementById('theme-stylesheet').setAttribute('href', stylesheet);
  },
  render: function () {
    return (
      <section className="Preferences">
        <p>Preferences</p>
        <Themes defaultValue={Preferences.getThemeName()}
          items={[
            {name: 'light', title: 'Light Theme', stylesheet: '/theme/light.css'},
            {name: 'dark',  title: 'Dark Theme',  stylesheet: '/theme/dark.css'}
          ]}
          onChange={this.onThemeChange}/>
      </section>
    );
  }
});

var Themes = React.createClass({
  componentDidMount: function () {
    var defaultItem = this.props.items.find(function (item) {
      return item.name == this.props.defaultValue;
    }, this);
    this.props.onChange(defaultItem || this.props.items[0]);
  },
  render: function () {
    return (
      <form className="Themes">
        {this.props.items.map(function (item) {
          return (
            <label>
              <input type="radio" name="Theme"
                defaultChecked={item.name == this.props.defaultValue}
                onChange={this.props.onChange.bind(this, item)}/>
              {item.title}
            </label>
          );
        }, this)}
      </form>
    );
  }
});

