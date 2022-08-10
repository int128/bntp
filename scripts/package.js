'use strict'

const AdmZip = require('adm-zip')
const { copyManifest } = require('./copy')

const main = async () => {
  await copyManifest()

  const zip = new AdmZip()
  await zip.addLocalFolderPromise('build')
  await zip.writeZipPromise('build.zip')
  console.info(`Created build.zip`)
}

main().catch(console.error)
