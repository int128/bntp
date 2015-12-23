Bookmarks in New Tab Page [![Build Status](https://travis-ci.org/int128/new-tab-bookmarks.svg?branch=master)](https://travis-ci.org/int128/new-tab-bookmarks)
=================

A Chrome extension which provides the new tab page with recently accessed sites and bookmarks.


Architecture
------------

Product:

* React
* ES6
* Less
* Chrome Extension API

Build system:

* webpack
* style-loader + less-loader
* gulp
* npm


Contribution
------------

This is an open source software licensed under the Apache License Version 2.0.
Feel free to open issues or pull requests.


Build
-----

npm is required. Install dependencies and run gulp:

```bash
npm install
npm install -g gulp

# once
gulp

# watching
gulp watch
```

Open Chrome and add `build/extension/` folder into extensions in the developer mode.


Release
-------

Generate distribution zip and upload to Chrome Store.

```bash
gulp zip
```

Take screenshots.

```sh
./screenshot.applescript
```

