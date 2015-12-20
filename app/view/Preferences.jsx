var React = require('react');

var Preferences = require('../repository/Preferences.jsx');

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

var ThemeItems = {
  _items: [
    {value: 'light', title: 'Light Theme', style: require('../theme/light.less')},
    {value: 'dark',  title: 'Dark Theme', style: require('../theme/dark.less')}
  ],
  all: function () {
    return this._items;
  },
  find: function (value) {
    return this._items.find(function (item) {
      return item.value == value;
    });
  },
  getDefault: function () {
    return this._items[0];
  }
};

var Themes = React.createClass({
  getInitialState: function () {
    var defaultItem = ThemeItems.find(Preferences.getThemeName()) || ThemeItems.getDefault();
    return {value: defaultItem.value};
  },
  componentDidMount: function () {
    ThemeItems.find(this.state.value).style.use();
  },
  onChange: function (currentValue) {
    var previousValue = this.state.value;
    this.setState({value: currentValue});
    Preferences.setThemeName(currentValue);
    ThemeItems.find(previousValue).style.unuse();
    ThemeItems.find(currentValue).style.use();
  },
  render: function () {
    return (
      <ThemeForm items={ThemeItems.all()} defaultValue={this.state.value} onChange={this.onChange}/>
    );
  }
});

var ThemeForm = React.createClass({
  onChange: function (event) {
    this.props.onChange(event.target.value);
  },
  render: function () {
    return (
      <form className="Themes">
        {this.props.items.map(function (item) {
          return (
            <label>
              <input type="radio" name="Theme" value={item.value}
                defaultChecked={item.value == this.props.defaultValue}
                onChange={this.onChange}/>
              {item.title}
            </label>
          );
        }, this)}
      </form>
    );
  }
});
