const fs = require('fs');
const archiver = require('archiver');
const paths = require('react-scripts/config/paths');

const zip = fs.createWriteStream(`${paths.appBuild}/../extension.zip`);
const archive = archiver('zip');

zip.on('close', () => console.log(`Archived ${archive.pointer()} bytes`));
archive.on('error', e => {throw e});
archive.pipe(zip);

archive.directory(paths.appBuild, '/');
archive.finalize();
