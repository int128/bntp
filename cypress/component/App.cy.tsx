import { App } from '../../src/App'

describe('<App>', () => {
  it('mounts', () => {
    cy.mount(<App />)
  })
})
