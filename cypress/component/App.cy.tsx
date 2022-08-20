import App from '../../src/App/component'
import { mockFaviconAPI } from '../support/chrome'

beforeEach(() => {
  mockFaviconAPI()
})

describe('<App>', () => {
  it('mounts', () => {
    cy.mount(<App />)
    cy.get('.Bookmark > a[href="http://www.google.com/"]')
    // https://stackoverflow.com/questions/51246606/test-loading-of-image-in-cypress
    cy.get<HTMLImageElement>('.BookmarkButton__Icon').should((images) =>
      images.map((_, image) => expect(image.naturalWidth).to.be.greaterThan(0))
    )
    cy.screenshot()
  })

  it('opens the bookmark editor', () => {
    cy.mount(<App />)
    cy.get('.Bookmark > a[href="http://www.google.com/"] ~ a[href="#Edit"]').click({ force: true })
    cy.screenshot()
  })
})
