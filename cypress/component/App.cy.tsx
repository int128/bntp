import App from '../../src/App'

describe('<App>', () => {
  it('mounts', () => {
    cy.viewport(1200, 800)
    cy.mount(<App />)
    cy.get('.Bookmark > a[href="http://www.google.com/"]')
    cy.screenshot()
  })
})
