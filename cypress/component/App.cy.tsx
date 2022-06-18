import App from '../../src/App'

describe('<App>', () => {
  it('mounts', () => {
    cy.viewport(1200, 800)
    cy.mount(<App />)
    cy.screenshot()
  })
})
