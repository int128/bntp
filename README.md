# BNTP: Bookmarks in New Tab Page [![react](https://github.com/int128/bntp/actions/workflows/react.yaml/badge.svg)](https://github.com/int128/bntp/actions/workflows/react.yaml)

This is an extension for Chrome, providing the New Tab Page with bookmarks and recently visited sites.
https://chrome.google.com/webstore/detail/feeleilgbmkkpapllljmclmbeddcdeeh

## Screenshots

Here are screenshots automatically generated by Cypress.

<table>
  <thead>
    <th>Light</th>
    <th>Dark</th>
  </thead>
  <tr>
    <td><img src="https://raw.githubusercontent.com/wiki/int128/bntp/main/cypress/screenshots/App.cy.tsx/App%20--%20mounts.png"></td>
    <td><img src="https://raw.githubusercontent.com/wiki/int128/bntp/main/cypress/screenshots/App.cy.tsx/App%20--%20enables%20dark%20mode.png"></td>
  </tr>
  <thead>
    <th>Bookmark Editor</th>
    <th></th>
  </thead>
  <tr>
    <td><img src="https://raw.githubusercontent.com/wiki/int128/bntp/main/cypress/screenshots/App.cy.tsx/App%20--%20opens%20the%20bookmark%20editor.png"></td>
    <td></td>
  </tr>
</table>

## Architecture

- Chrome extension
- React Hooks
- TypeScript
- ESLint
- Prettier
- Storybook

## History

- v3 is built with React Hooks and TypeScript (2022)
- [v2](https://github.com/int128/bntp/tree/v2) was built with React, Redux and Immutable.js (2017)
- v1.2 was built with React (2015)
- v1.1 was built with Vue.js (2015)
- v1.0 was built with Angular 1 and Coffeescript (2014)

## Development

In the project directory, you can run:

### Run the extension on Chrome

To watch and build the extension in development mode:

```sh
pnpm run start
```

To add it to Chrome:

1. Open the Chrome Extensions page
1. Click "Load unpacked" button
1. Select `/build` directory
1. Open a new tab

### Test

```sh
# Jest
pnpm run test

# Cypress
pnpm run cypress:test
```

### Release

Create a release tag.
GitHub Actions workflow builds a package for production as `build.zip` archive.
