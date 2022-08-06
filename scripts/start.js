'use strict'

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

const fs = require('fs-extra')
const webpack = require('webpack')
const configFactory = require('react-scripts/config/webpack.config')
const { createCompiler } = require('react-dev-utils/WebpackDevServerUtils')

const compiler = createCompiler({
  urls: [],
  useTypeScript: true,
  useYarn: true,
  devSocket: {
    warnings: () => {},
    errors: () => {},
  },
  config: configFactory('development'),
  webpack,
})

const syncPublicDirectory = () => {
  fs.copy('public', 'build', { filter: (filename) => filename !== 'public/index.html' })
    .then(() => console.info(`Successfully synced public directory`))
    .catch((e) => console.error(`Error while syncing public directory`, e))
}

compiler.watch({}, () => syncPublicDirectory())
fs.watch('public', () => syncPublicDirectory())
