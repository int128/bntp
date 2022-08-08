import App from '../../src/App'

describe('<App>', () => {
  it('mounts', () => {
    cy.viewport('macbook-11')
    cy.mount(<App />)
    cy.get('.Bookmark > a[href="http://www.google.com/"]')
    cy.get('.BookmarkButton__Icon').and(($img) => {
      // https://stackoverflow.com/questions/51246606/test-loading-of-image-in-cypress
      expect($img[0].naturalWidth).to.be.greaterThan(0)
    })
    cy.screenshot()
  })
})
