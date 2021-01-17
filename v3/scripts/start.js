'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const fs = require('fs-extra');
const webpack = require('webpack');
const configFactory = require('react-scripts/config/webpack.config');
const {createCompiler} = require('react-dev-utils/WebpackDevServerUtils');

const config = configFactory('development');

const devSocket = {
  warnings: () => {},
  errors: () => {},
};

const compiler = createCompiler({
  urls: [],
  useTypeScript: true,
  useYarn: true,
  devSocket,
  config,
  webpack,
});

compiler.watch({}, () => {
  // sync the static files
  fs.copySync('public', 'dist', {
    dereference: true,
    filter: f => f !== 'public/index.html',
  });
});
