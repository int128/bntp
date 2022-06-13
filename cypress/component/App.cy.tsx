import App from '../../src/App'

describe('<App>', () => {
  it('mounts', () => {
    cy.viewport(1024, 576)
    cy.mount(<App />)
    cy.screenshot()
  })
})
