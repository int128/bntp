new tab bookmarks
=================

A Chrome extension to add the tab with top-sites and bookmarks.


Contribution
------------

This is an open source software licensed under the Apache License Version 2.0.


Dependencies
------------

* Product
  * AngularJS
  * Chrome Extension API
    * Bookmarks
    * Top Sites
  * CoffeeScript
  * LESS
* Build
  * npm
  * gulp
  * bower


How to build
------------

npm is required. At first, install dependencies.

```bash
npm install
npm install -g gulp
```

Then, build the extension and add `build/extension/` folder to Chrome in the developer mode.

```bash
gulp
```

Also supports watching sources in `src/main/`.

```bash
gulp watch
```

Generate distribution zip and upload to Chrome Store.

```bash
gulp zip
```
