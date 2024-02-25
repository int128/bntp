'use strict'

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

const fs = require('fs')
const webpack = require('webpack')
const configFactory = require('react-scripts/config/webpack.config')
const { createCompiler } = require('react-dev-utils/WebpackDevServerUtils')
const { copyPublicDirectory, copyManifest } = require('./copy')

const compiler = createCompiler({
  urls: [],
  useTypeScript: true,
  devSocket: {
    warnings: () => {},
    errors: () => {},
  },
  config: configFactory('development'),
  webpack,
})

const main = async () => {
  await fs.promises.rm('build', { recursive: true, force: true })

  fs.watch('public', () => copyPublicDirectory())
  await copyPublicDirectory()
  fs.watch('manifest.json', () => copyManifest())
  await copyManifest()

  compiler.watch({}, () => {})
}

main().catch(console.error)
