process.env.NODE_ENV = 'development';

var fs = require('fs-extra');
var paths = require('react-scripts/config/paths');
var webpack = require('webpack');
var config = require('react-scripts/config/webpack.config.dev.js');

// removes react-dev-utils/webpackHotDevClient.js at first in the array
config.entry.shift();

var compiler = webpack(config);
compiler.watch({}, function(err, stats) {
  if (err) {
    console.error(err);
  } else {
    copyPublicFolder();
  }
  console.error(stats.toString({
    chunks: false,
    colors: true
  }));
});

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml
  });
}
