BNTP: Bookmarks in New Tab Page [![Build Status](https://travis-ci.org/int128/bntp.svg?branch=master)](https://travis-ci.org/int128/bntp)
===============================

A Chrome extension which provides the new tab page with recently accessed sites and bookmarks.


Architecture
------------

* React
* Redux
* Redux Saga
* Immutable.js
* ES6
* Chrome Extension API

Build by create-react-app.


Contribution
------------

This is an open source software licensed under the Apache License Version 2.0.
Feel free to open issues or pull requests.


Build
-----

npm is required

```bash
npm install
npm start
```

Open Chrome and add `build/extension/` folder into extensions in the developer mode.


Release
-------

Generate distribution zip and upload to Chrome Store.

```bash
npm run build
npm run zip
```

Take screenshots.

```sh
./screenshot.applescript
```
