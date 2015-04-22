new tab bookmarks [![Build Status](https://travis-ci.org/int128/new-tab-bookmarks.svg?branch=master)](https://travis-ci.org/int128/new-tab-bookmarks)
=================

A Chrome extension to add the light weight new-tab-page with tiled bookmarks.


Architecture
------------

Product:

* React
* JSX
* LESS
* Chrome Extension API
  * Bookmarks
  * Top Sites

Build system:

* webpack
* gulp
* npm


Contribution
------------

This is an open source software licensed under the Apache License Version 2.0.


Build
-----

npm is required. At first, install dependencies.

```bash
npm install
npm install -g gulp
```

Then, build the extension and add `build/extension/` folder to Chrome in the developer mode.

```bash
gulp
```

Also supports watching sources.

```bash
gulp watch
```

Generate distribution zip and upload to Chrome Store.

```bash
gulp zip
```
