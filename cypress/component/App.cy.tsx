import App from '../../src/App'

describe('<App>', () => {
  it('mounts', () => {
    cy.viewport(1920, 1080)
    cy.mount(<App />)
    cy.screenshot()
  })
})
