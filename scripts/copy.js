'use strict'

const fs = require('fs-extra')

const copyPublicDirectory = async () => {
  await fs.copy('public', 'build', { filter: (filename) => filename !== 'public/index.html' })
  console.info(`Successfully copied public directory`)
}

const copyManifest = async () => {
  const manifest = await fs.readJSON('manifest.json')
  manifest.version = process.env.GITHUB_REF_NAME ?? '0.0.0'
  await fs.writeJSON('build/manifest.json', manifest)
  console.info(`Successfully copied manifest.json`)
}

module.exports = {
  copyPublicDirectory,
  copyManifest,
}
